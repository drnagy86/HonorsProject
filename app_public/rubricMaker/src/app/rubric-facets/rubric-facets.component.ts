import {Component, Input, OnInit} from '@angular/core';
import {Rubric, Facet, Criteria} from "../classes/rubric";

@Component({
  selector: 'app-rubric-facets',
  templateUrl: './rubric-facets.component.html',
  styleUrls: ['./rubric-facets.component.css']
})
export class RubricFacetsComponent implements OnInit {

  @Input() rubric: Rubric | any;

  public scoreRange : number[] = [];

  constructor() { }

  ngOnInit(): void {
    this.scoreRange = this.findScoreRange(this.rubric);
  }
  private findScoreRange(rubricScore : Rubric): number[] {
    const result : number[] = [];

    const facetOne : Facet = rubricScore.facets[0];
    for (let criterion of facetOne.criteria) {
      result.push(criterion.score)
    }
    return result;
}

}
