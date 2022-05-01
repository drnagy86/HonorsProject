import {AfterContentInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {RubricDataService} from "../rubric-data.service";
import {Criteria, Facet, Rubric, Subject} from "../classes/rubric";
import {ActivatedRoute, ParamMap} from '@angular/router';
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
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-create-rubric',
  templateUrl: './create-rubric.component.html',
  styleUrls: ['./create-rubric.component.css']
})
export class CreateRubricComponent implements OnInit, AfterContentInit {

  @Input() rubric: Rubric = new Rubric(
    "",
    "",
    "",
    new Date(Date.now()),
    new Date(Date.now()),
    "",
    true,
    [],
    []);

  @Output() rubricChange : EventEmitter<Rubric> = new EventEmitter<Rubric>();
  @Output() viewLoaded = new EventEmitter();


  public isEditing: boolean = false;
  public activeTab = 'createRubric';
  public rubricIsCreated: boolean = false;

  public subjects: Subject[] = [];
  public isReadyToAddSubjects: boolean = false;
  public isFacetTableVisible: boolean = false;
  public subjectFormVisible: boolean = false;
  public isAddingNewSubject: boolean = false;
  public subjectFormError: string = '';
  public bottomScoreIsHigherThanTopErrorMessage: string = '';
  public scoreArray: number[] = [];
  public newSubject: Subject = new Subject('', '');
  public rubricID: string | null = null;

  public isReadyForFacetsToLoad : boolean = false;

  changeTab(activeTab: string) {
    this.activeTab = activeTab;
  }

  rubricForm = this.fb.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    bottomScore: [1, [
      Validators.required,
      Validators.min(0),
      Validators.max(8)
    ]],
    topScore: [4, [
      Validators.required,
      Validators.min(1),
      Validators.max(9)
    ]],
    subjects: this.fb.group({
      newSubjectName: ['', [
        Validators.minLength(1)
      ]],
      newSubjectDescription: ['', [
        Validators.minLength(1)
      ]],
      chooseSubjectName: ['']
    })
  }, {validators: topAndBottomScoreValidation});

  get name() {
    return this.rubricForm.get('name');
  }

  get description() {
    return this.rubricForm.get('description');
  }

  get bottomScore() {
    return this.rubricForm.get('bottomScore');
  }

  get topScore() {
    return this.rubricForm.get('topScore');
  }

  get newSubjectName() {
    return this.rubricForm.value.subjects.newSubjectName;
  }

  get newSubjectDescription() {
    return this.rubricForm.value.subjects.description;
  }

  get chooseSubjectName() {
    return this.rubricForm.value.subjects.chooseSubjectName;
  }

  constructor(
    private rubricDataService: RubricDataService,
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute
  ) {

    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          let id = params.get('rubricId');

          this.rubricID = id;
          return this.rubricDataService.getRubricById(id);
        })
      ).subscribe((newRubric: Rubric) => {
    });

    if (this.rubricID !== null) {
      this.getRubric();
    }
    this.rubricChange.emit(this.rubric);


    console.log("Create Rubric constructor");
    console.log(this.rubric);

  }

  ngAfterContentInit(): void {

    }

  async getRubric(){
    try {

      await this.rubricDataService.getRubricById(this.rubricID)
        .then( r => {
          this.rubric = r;
          console.log("Get rubric method then assigns rubtic");
          console.log(this.rubric);


        })
        .finally(() => {
          this.rubricForm.patchValue(this.rubric);
          this.isEditing = true;
          this.rubricChange.emit(this.rubric);
          this.isReadyForFacetsToLoad = true;
          console.log("Get rubric method then emits rubric change");
          console.log(this.rubric);

        });

      //this.rubric = await this.rubricDataService.getRubricById(this.rubricID);


      // this.rubricForm.patchValue(this.rubric);
      // this.isEditing = true;
      // this.rubricChange.emit(this.rubric);
      // console.log("Get rubric method");
      // console.log(this.rubric);


    } catch (e) {
      console.log(e);
    }
  }


  topScoreNumber: number = 4;
  bottomScoreNumber: number = 0;

  async ngOnInit(): Promise<void> {
    this.getAllSubjects();

    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          let id = params.get('rubricId');

          this.rubricID = id;
          return this.rubricDataService.getRubricById(id);
        })
      ).subscribe((newRubric: Rubric) => {
    });

    if (this.rubricID !== null) {
      try {
        this.rubric = await this.rubricDataService.getRubricById(this.rubricID);
        this.rubricForm.patchValue(this.rubric);
        this.isEditing = true;
        this.rubricChange.emit(this.rubric);

      } catch (e) {
        console.log(e);
      }
    }

    console.log("Create Rubric On init before emit");
    console.log(this.rubric);


    this.rubricChange.emit(this.rubric);

    console.log("Create Rubric On init after emit");
    console.log(this.rubric);

  }


  onAddSubjectSubmit(): void {
    this.subjectFormError = '';
    if (this.formIsValid()) {
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
    if (this.rubricForm.status === 'VALID' && this.rubricIsCreated == false) {
      const user: User = this.authenticationService.getCurrentUser();

      this.rubric.name = this.rubricForm.get("name")?.value;
      this.rubric.description = this.rubricForm.get("description")?.value;
      this.rubric.rubricCreator = user.email;

      try {
        this.rubric = await this.rubricDataService.createNewRubric(this.rubric);
        this.changeTab('addSubjects');
        this.rubricIsCreated = true;
      } catch (e) {
        console.log(e);
        // send message to user
      }
      this.isEditing = true;

      this.rubricChange.emit(this.rubric);
    }
  }

  async onRubricEdit() {
    if (this.rubricForm.status === 'VALID' && this.isEditing) {

      let newRubricName : string = this.rubricForm.get("name")?.value;
      let newRubricDescription : string = this.rubricForm.get("description")?.value;

      try {
        this.rubric = await this.rubricDataService.updateRubric(this.rubric, newRubricName, newRubricDescription);

      } catch (e) {
        console.log(e);
      }

      console.log(this.rubric);
    }
    this.rubricChange.emit(this.rubric);

  }

  private formIsValid(): boolean {
    if (this.newSubject.subject_id) {
      return true;
    } else {
      return false;
    }
  }

  resetSubjectForm(): void {
    this.newSubject.subject_id = '';
    this.newSubject.description = '';
    this.subjectFormError = '';
    this.subjectFormVisible = false;
  }

  addSubject() {
    if (this.isAddingNewSubject) {
      let newSubject: Subject = new Subject(
        this.newSubjectName,
        this.newSubjectDescription
      );
      this.rubric.subjects.push(newSubject);
      this.rubricForm.get(["subjects"])?.reset();
    } else {
      const thing: Subject | undefined = this.subjects.find(s => s.subject_id === this.chooseSubjectName);
      if (thing !== undefined) {
        const newSubject: Subject = new Subject(thing.subject_id, thing.description);
        this.rubric.subjects.push(newSubject);
      }
    }
  }

  cancelCreatingRubric() {

  }

  checkScoreRange() {
    if (this.topScore != null && this.bottomScore != null) {
      if (this.topScore.value < this.bottomScore.value) {
        this.bottomScoreIsHigherThanTopErrorMessage = "Bottom score can not be higher than top.";
        this.topScore.setValue(this.bottomScore.value + 1);

      } else if (this.topScore.value == this.bottomScore.value) {
        this.bottomScoreIsHigherThanTopErrorMessage = "The two scores can not be the same.";
        this.topScore.setValue(this.bottomScore.value + 1);
      } else {
        this.bottomScoreIsHigherThanTopErrorMessage = "";
      }
    }
  }

  getAllSubjects(): void {
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

  sendScoreRangeToFacets() {
    this.topScoreNumber = this.topScore?.value;
    this.bottomScoreNumber = this.bottomScore?.value;
    this.isFacetTableVisible = true;
  }

  updateRubric() {
    this.rubricChange.emit(this.rubric);
  }
}

export const topAndBottomScoreValidation: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  let result: boolean = false;

  const bottomScore = control.get('bottomScore');
  const topScore = control.get('topScore');

  if (bottomScore !== null && topScore !== null) {
    result = bottomScore < topScore;
  }

  return result ? {validScoreRange: true} : null;


}
