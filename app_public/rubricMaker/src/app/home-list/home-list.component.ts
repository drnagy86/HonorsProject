import { Component, OnInit } from '@angular/core';
import {RubricDataService} from "../rubric-data.service";

import { Rubric} from "../classes/rubric";

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.css']
})
export class HomeListComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

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
