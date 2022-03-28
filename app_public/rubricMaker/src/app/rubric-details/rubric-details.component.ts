import { Component, OnInit, Input } from '@angular/core';
import {Rubric, Subject, Facets, Criteria} from "../classes/rubric";
import {RubricDataService} from "../rubric-data.service";

@Component({
  selector: 'app-rubric-details',
  templateUrl: './rubric-details.component.html',
  styleUrls: ['./rubric-details.component.css']
})
export class RubricDetailsComponent implements OnInit {
  public subjectFormVisible: boolean = false;
  public addNewSubjectFormVisible: boolean = false;
  // public showHide: any;
  // public isChecked: boolean = true;
  public subjectFormError : string = '';

  public newSubject : Subject = new Subject('','');

  @Input() rubric: Rubric | any;

  constructor(private rubricDataService: RubricDataService) { }

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
}
