import { Component, OnInit } from '@angular/core';
import {RubricDataService} from "../rubric-data.service";
import {Rubric} from "../classes/rubric";
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.css']
})
export class DetailsPageComponent implements OnInit {

  constructor(
    private rubricDataService : RubricDataService,
    private route: ActivatedRoute
  ) { }

  newRubric : Rubric | null = null;

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params : ParamMap) => {
          let id: string | null = params.get('rubricId');
          return this.rubricDataService.getRubricById(id);
        })
      )
      .subscribe((newRubric : Rubric) => {
        this.newRubric = newRubric;
        this.pageContent.header.title = newRubric.name;
        // send more stuff here eventually
        this.pageContent.sidebar = newRubric.description;
      });


  }

  public pageContent = {
    header: {
      title: '',
      strapline: ''

    },
    sidebar: ''
};

}
