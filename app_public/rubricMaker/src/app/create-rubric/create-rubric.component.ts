import {AfterContentInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {RubricDataService} from "../rubric-data.service";
import {Criteria, Facet, Rubric, Subject} from "../classes/rubric";
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
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
    private route: ActivatedRoute,
    private router : Router
  ) {

    // if there are no query parameters, don't do this
    let rubID = this.route.snapshot.params['rubricId'];
    // this.route.paramMap
    //   .pipe(
    //     switchMap((params: ParamMap) => {
    //       let id = params.get('rubricId');
    //       this.rubricID = id;
    //       return this.rubricDataService.getRubricById(id);
    //     })
    //   ).subscribe((newRubric: Rubric) => {
    // });
    if (rubID !== undefined) {
      this.rubricID = rubID;
      this.getRubric();
    }
    this.rubricChange.emit(this.rubric);
  }

  ngAfterContentInit(): void {
    }

  async getRubric(){
    try {
      await this.rubricDataService.getRubricById(this.rubricID)
        .then( r => {
          this.rubric = r;

        })
        .finally(() => {
          this.rubricForm.patchValue(this.rubric);
          this.isEditing = true;
          this.isFacetTableVisible = true;
          this.rubricChange.emit(this.rubric);
          this.isReadyForFacetsToLoad = true;
          // console.log("Get rubric method then emits rubric change");
          // console.log(this.rubric);

        });

    } catch (e) {
      console.log(e);
    }
  }

  topScoreNumber: number = 4;
  bottomScoreNumber: number = 0;

  async ngOnInit(): Promise<void> {
    this.getAllSubjects();
  }


  onAddSubjectSubmit(): void {
    this.subjectFormError = '';
    if (this.formIsValid()) {
      this.rubricDataService.addSubjectByRubricId(this.rubric._id, this.newSubject)
        .then((subject: Subject) => {
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
        await this.rubricDataService.createNewRubric(this.rubric)
          .then(rubric => {
            this.rubric = rubric;
            this.changeTab('addSubjects');
            this.rubricIsCreated = true;
          });

      } catch (e) {
        console.log(e);
      }
      //if (this.isEditing) this.rubricChange.emit(this.rubric);
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
    }
    this.rubricChange.emit(this.rubric);
    await this.router.navigate([`/rubric/${this.rubric._id}`]);

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

  async cancelCreatingRubric() {
    await this.router.navigate([`/`]);
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

  openFacetAccordion() {
    this.topScoreNumber = this.topScore?.value;
    this.bottomScoreNumber = this.bottomScore?.value;
    this.isFacetTableVisible = true;
    this.isReadyForFacetsToLoad = true;


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
