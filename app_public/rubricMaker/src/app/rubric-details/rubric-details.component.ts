import { Component, OnInit, Input } from '@angular/core';
import {Rubric, Subject, Facet, Criteria} from "../classes/rubric";
import {RubricDataService} from "../rubric-data.service";
import {AuthenticationService} from "../authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-rubric-details',
  templateUrl: './rubric-details.component.html',
  styleUrls: ['./rubric-details.component.css']
})
export class RubricDetailsComponent implements OnInit {
  public subjectFormVisible: boolean = false;
  public addNewSubjectFormVisible: boolean = false;
  public subjectFormError : string = '';
  public newSubject : Subject = new Subject('','');
  public isRubricCreator : boolean = false;

  @Input() rubric: Rubric | any;

  constructor(
    private rubricDataService: RubricDataService,
    private authenticationService: AuthenticationService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.checkIfUserIsCreator();
  }
  private checkIfUserIsCreator(){
    let user = this.authenticationService.getCurrentUser();
    if (user.email === this.rubric.rubricCreator) this.isRubricCreator = true;
  }

  async deleteRubric() {
    try {
      await this.rubricDataService.deactivateRubric(this.rubric._id)
        .then(async rubric => {
          if (rubric.active === false) {
            // redirect to home page
            await this.router.navigate([`/`]);
          }
        });
    } catch (e) {
      console.log(e);
    }

  }
}
