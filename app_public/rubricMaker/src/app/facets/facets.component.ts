import {RubricDataService} from "../rubric-data.service";
import {Criteria, Facet, Rubric} from "../classes/rubric";
import {Component, OnInit, Input} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Form,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
  FormArray
} from "@angular/forms";
import {Validators} from "@angular/forms";


@Component({
  selector: 'app-facets',
  templateUrl: './facets.component.html',
  styleUrls: ['./facets.component.css']
})
export class FacetsComponent implements OnInit {

  public scoreArray: number[] = [];
  @Input() rubric!: Rubric;
  @Input() topScore!: number;
  @Input() bottomScore!: number;

  facetForm = this.fb.group({
    facetFormName: ['', Validators.required],
    criteriaInputs : this.fb.array([
      // this.fb.control('')
    ])
  });

  get criteriaInputs(){
    return this.facetForm.get('criteriaInputs') as FormArray;
  }

  addCriteriaInput(){
    this.criteriaInputs.push(this.fb.control(""));
  }

  constructor(
    private rubricDataService: RubricDataService,
    private fb : FormBuilder
  ) {
    // this.setUpTable();

    for (let i = this.bottomScore; i < this.topScore; i++) {
      this.addCriteriaInput();
    }
  }

  setUpTable() {
    this.scoreArray = [];
    for (let i = this.bottomScore; i < this.topScore + 1; i++) {
      this.scoreArray.push(i);
    }
  }

  ngOnInit(): void {

    this.setUpTable();

    let blankCriteria: Criteria = new Criteria('', '', 0, new Date(Date.now()), new Date(Date.now()), true);
    let blankCriteriaList: Criteria[] = [];

    for (let i = this.bottomScore; i < this.topScore + 1; i++) {
      blankCriteriaList.push(new Criteria('test', i + " Test", i, new Date(Date.now()), new Date(Date.now()), true))
    }
    let blankFacet: Facet = new Facet('test', '','', new Date(Date.now()), new Date(Date.now()), true, blankCriteriaList);
    this.rubric.facets.push(blankFacet);

    // for (let i = this.bottomScore; i < this.topScore; i++) {
    //   // this.facetForm.addControl(String(i),new FormControl('', Validators.required));
    //   this.addCriteriaInput();
    // }


  }

  addFacet() {

    console.log(this.facetForm.value);

    for (let criteria of this.criteriaInputs.controls) {
      console.log(criteria.value);
    }

  }
}
