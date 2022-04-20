import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {RubricDataService} from "../rubric-data.service";
import {Criteria, Facets, Rubric, Subject} from "../classes/rubric";
import { ActivatedRoute, ParamMap } from '@angular/router';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Form,
  ValidatorFn,
  AbstractControl,
  ValidationErrors
} from "@angular/forms";
import {Validators} from "@angular/forms";
import {AuthenticationService} from "../authentication.service";
import {User} from "../classes/user";



@Component({
  selector: 'app-create-rubric',
  templateUrl: './create-rubric.component.html',
  styleUrls: ['./create-rubric.component.css']
})
export class CreateRubricComponent implements OnInit {

  public activeTab = 'createRubric';
  public rubricIsCreated : boolean = false;
  public btnCreate : string = (!this.rubricIsCreated)?"Create": "Edit";
  public subjects : Subject[] = [];
  public isReadyToAddSubjects : boolean = false;

  changeTab(activeTab : string){
    this.activeTab = activeTab;
  }

  rubricForm = this.fb.group({
    title : ['', [Validators.required]],
    description : ['', [Validators.required]],
    bottomScore : [1, [
      Validators.required,
      Validators.min(0),
      Validators.max(8)
    ]],
    topScore : [4, [
      Validators.required,
      Validators.min(1),
      Validators.max(9)
    ]],
    subjects: this.fb.group({
      newSubjectName : ['', [
        Validators.minLength(1)
      ]],
      newSubjectDescription : ['' , [
        Validators.minLength(1)
      ]],
      chooseSubjectName : ['']
    })
  }, {validators : topAndBottomScoreValidation} );

  get title() {return this.rubricForm.get('title');}
  get description(){return this.rubricForm.get('description');}
  get bottomScore(){return this.rubricForm.get('bottomScore');}
  get topScore(){return this.rubricForm.get('topScore');}

  get newSubjectName(){return this.rubricForm.value.subjects.newSubjectName;}
  get newSubjectDescription(){return this.rubricForm.value.subjects.description;}
  get chooseSubjectName(){return this.rubricForm.value.subjects.chooseSubjectName;}

  public subjectFormVisible: boolean = false;
  public isAddingNewSubject: boolean = false;
  public subjectFormError : string = '';
  public bottomScoreIsHigherThanTopErrorMessage : string = '';

  public scoreArray : number[] = [];

  public newSubject : Subject = new Subject('','');

  @Input() rubric: Rubric = new Rubric(
    "",
    "",
    "",
    new Date( Date.now()),
    new Date( Date.now()),
    "",
    true,
    [],
    []);


  constructor(
    private rubricDataService: RubricDataService,
    private fb : FormBuilder,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    // this.setUpTable();
    // let blankCriteria : Criteria = new Criteria('','',0, new Date(Date.now()) ,new Date(Date.now()),true);
    // let blankCriteriaList : Criteria[] = [];
    //
    // for (let i = this.bottomScore?.value; i < this.topScore?.value + 1; i++) {
    //
    //   blankCriteriaList.push(new Criteria('test',i + " Test",i, new Date(Date.now()) ,new Date(Date.now()),true))
    // }
    // let blankFacet : Facets = new Facets('test','',new Date(Date.now()),new Date(Date.now()),true, blankCriteriaList);
    // this.rubric.facets.push(blankFacet);

    this.getAllSubjects();

  }

  onAddSubjectSubmit() : void {
    this.subjectFormError = '';
    if (this.formIsValid()){
      //console.log(this.newSubject);
      this.rubricDataService.addSubjectByRubricId(this.rubric._id, this.newSubject)
        .then((subject: Subject) => {
          //console.log('Subject saved', subject);
          let subjects = this.rubric.subjects.slice(0);
          subjects.unshift(subject);
          this.rubric.subjects = subjects;
          this.resetSubjectForm();
        });
    } else {
      this.subjectFormError = 'The subject name field is required'
    }
  }

  async onRubricSubmit() {

    console.log("onRubricSubmit");

    if (this.rubricForm.status === 'VALID' && this.rubricIsCreated== false) {
      const user: User = this.authenticationService.getCurrentUser();

      this.rubric.name = this.rubricForm.get("title")?.value;
      this.rubric.description = this.rubricForm.get("description")?.value;
      this.rubric.rubricCreator = user.email;

      try {
        this.rubric = await this.rubricDataService.createNewRubric(this.rubric);
        this.changeTab('addSubjects');
        this.rubricIsCreated = true;
      } catch (e){
        console.log(e);
      }
      this.btnCreate = (!this.rubricIsCreated)?"Create": "Edit"
    }



  }

  private formIsValid(): boolean {
    if (this.newSubject.subject_id){
      return true;
    } else {
      return false;
    }
  }

  resetSubjectForm() : void {
    this.newSubject.subject_id = '';
    this.newSubject.description = '';
    this.subjectFormError = '';
    this.subjectFormVisible = false;

  }

  addSubject() {
    if (this.isAddingNewSubject){
      let newSubject : Subject = new Subject(
        this.newSubjectName,
        this.newSubjectDescription
      );
      this.rubric.subjects.push(newSubject);
      this.rubricForm.get(["subjects"])?.reset();
    }
    else {
      const thing : Subject | undefined = this.subjects.find(s => s.subject_id === this.chooseSubjectName);
      if (thing !== undefined){
        const newSubject: Subject = new Subject(thing.subject_id, thing.description);
        this.rubric.subjects.push(newSubject);
      }
    }
  }

  cancelCreatingRubric() {

  }


  checkScoreRange() {
    if (this.topScore != null && this.bottomScore != null){
      if (this.topScore.value < this.bottomScore.value){
        this.bottomScoreIsHigherThanTopErrorMessage = "Bottom score can not be higher than top.";
        this.topScore.setValue(this.bottomScore.value + 1);

      } else if (this.topScore.value == this.bottomScore.value){
        this.bottomScoreIsHigherThanTopErrorMessage = "The two scores can not be the same.";
        this.topScore.setValue(this.bottomScore.value + 1);
      } else {
        this.bottomScoreIsHigherThanTopErrorMessage = "";
      }
    }
    this.setUpTable();
  }

  setUpTable(){
    this.scoreArray = [];
    for (let i = this.bottomScore?.value; i < this.topScore?.value + 1; i++) {
      this.scoreArray.push(i);
    }

    this.setUpTable();
    let blankCriteria : Criteria = new Criteria('','',0, new Date(Date.now()) ,new Date(Date.now()),true);
    let blankCriteriaList : Criteria[] = [];

    for (let i = this.bottomScore?.value; i < this.topScore?.value + 1; i++) {

      blankCriteriaList.push(new Criteria('test',i + " Test",i, new Date(Date.now()) ,new Date(Date.now()),true))
    }
    let blankFacet : Facets = new Facets('test','',new Date(Date.now()),new Date(Date.now()),true, blankCriteriaList);
    this.rubric.facets.push(blankFacet);
  }

  getAllSubjects() : void{
    this.rubricDataService
      .getSubjects()
      .then(foundSubjects => {
        this.subjects = foundSubjects;
      });
  }

  async readyToAddSubjects() {
    this.isReadyToAddSubjects = true;
    if (this.rubricIsCreated && this.rubric.subjects.length > 0 && this.isReadyToAddSubjects) {

      for (const subject of this.rubric.subjects) {
        try {
          console.log(subject);
          await this.rubricDataService.addSubjectByRubricId(this.rubric._id, subject);
        } catch (e) {
          console.log(e);
        }
        this.isReadyToAddSubjects = false;
      }
    }
    this.changeTab('facetScoreRange');
  }
}
export const topAndBottomScoreValidation : ValidatorFn = (control : AbstractControl) : ValidationErrors | null => {
  let result : boolean = false;

  const bottomScore = control.get('bottomScore');
  const topScore = control.get('topScore');

  if (bottomScore !== null && topScore !== null){
    result = bottomScore < topScore;
  }

  return result ? {validScoreRange : true} : null ;


}
