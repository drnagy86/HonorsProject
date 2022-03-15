import { Component, OnInit } from '@angular/core';
import {RubricDataService} from "../rubric-data.service";

export class Rubric {
  constructor(id: string, name: string, description: string, dateCreated: Date, dateUpdated: Date, rubricCreator: string, active: boolean, subjects: string[]) {
    this._id = id;
    this.name = name;
    this.description = description;
    this.dateCreated = dateCreated;
    this.dateUpdated = dateUpdated;
    this.rubricCreator = rubricCreator;
    this.active = active;
    this.subjects = subjects;
  }
  _id: string;
  name: string;
  description: string;
  dateCreated : Date;
  dateUpdated : Date;
  rubricCreator: string;
  active: boolean;
  subjects: string[]
}


@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.css']
})
export class HomeListComponent implements OnInit {

  constructor(private rubricDataService: RubricDataService) { }

  public rubrics : Rubric[] = [];

//create a function to call the data service
  private getRubrics(): void {
    this.rubricDataService
      .getRubrics()
      // update the rubrics array with the contents of the response
      .then(foundRubrics => this.rubrics = foundRubrics);
  }

//   rubrics: Rubric[] = [{
//     _id: 'test',
//     name: 'Test',
//     description: 'Test description',
//     dateCreated : new Date(),
//     dateUpdated : new Date(),
//     rubricCreator: 'Derrick',
//     active: true,
//     subjects :['ESL', 'Writing']
//   }, {
//     _id: 'test2',
//     name: 'Test2',
//     description: 'Test description2',
//     dateCreated : new Date(),
//     dateUpdated : new Date(),
//     rubricCreator: 'Derrick',
//     active: true,
//     subjects :['ESL', 'Reading']
//   }
// ]
  ngOnInit(): void {
    this.getRubrics();
  }

}
