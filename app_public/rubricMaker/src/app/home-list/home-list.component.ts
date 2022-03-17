import { Component, OnInit } from '@angular/core';
import {RubricDataService} from "../rubric-data.service";

import { Rubric} from "../classes/rubric";

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
