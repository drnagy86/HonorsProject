import {Component, Input, OnInit} from '@angular/core';
import {RubricDataService} from "../rubric-data.service";
import {Facets, Rubric, Subject} from "../classes/rubric";
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

  rubricForm = this.fb.group({
    title : ['', [Validators.required]],
    description : ['', [Validators.required]],
    bottomScore : [0, [
      Validators.required,
      Validators.min(0),
      Validators.max(8)
    ]],
    topScore : [9, [
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

  public subjectFormVisible: boolean = false;
  public addNewSubjectFormVisible: boolean = false;
  public subjectFormError : string = '';
  public bottomScoreIsHigherThanTopErrorMessage : string = '';


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

  async onSubmit() {
    if (this.rubricForm.status === 'VALID') {
      const user: User = this.authenticationService.getCurrentUser();

      this.rubric.name = this.rubricForm.get("title")?.value;
      this.rubric.description = this.rubricForm.get("description")?.value;
      this.rubric.rubricCreator = user.email;

      try {
        this.rubric = await this.rubricDataService.createNewRubric(this.rubric);
      } catch (e){
        console.log(e);
      }

      console.log(this.rubric);

    }
    // console.log(this.rubric.name);
    //console.log(this.rubricForm.status);
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
    // make sure that it doesn't already exist in rubric
    let newSubject : Subject = new Subject(
      this.newSubjectName,
      this.newSubjectDescription
    );

    this.rubric.subjects.push(newSubject);
    this.rubricForm.get(["subjects"])?.reset();
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
