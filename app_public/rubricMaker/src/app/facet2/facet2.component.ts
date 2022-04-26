import {Component, Input, OnInit} from '@angular/core';
import {FormGroup, FormArray, FormBuilder, Validators} from '@angular/forms'
import {Criteria, Facet, Rubric} from "../classes/rubric";
import {RubricDataService} from "../rubric-data.service";



@Component({
  selector: 'app-facet2',
  templateUrl: './facet2.component.html',
  styleUrls: ['./facet2.component.css']
})
export class Facet2Component implements OnInit {
  facetForm : FormGroup = this.fb.group({
    facets : this.fb.array([]),
  });

  isEditing : boolean = false;

  public scoreArray: number[] = [];
  @Input() rubric!: Rubric;
  @Input() topScore!: number;
  @Input() bottomScore!: number;

  constructor(
    private rubricDataService: RubricDataService,
    private fb:FormBuilder) { }

  setUpScoreArray() {
    this.scoreArray = [];
    for (let i = this.bottomScore; i < this.topScore + 1; i++) {
      this.scoreArray.push(i);
    }
  }

  //employees()
  facetsFormArray():FormArray{
    return this.facetForm.get("facets") as FormArray;
  }

  newFacet(): FormGroup {
    return this.fb.group({
      facetName : ['' , [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(100)
      ]],
      facetDescription : ['' , [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(500)
      ]],
      criteria: this.fb.array([])
    });
  }

  addFacet() {
    this.facetsFormArray().push(this.newFacet());
    this.addAllCriteriaForFacet(this.facetsFormArray().length-1);

  }

  removeFacet(facetFormArrayIndex : number){
    this.facetsFormArray().removeAt(facetFormArrayIndex);
  }

  // employeeSkills
  facetCriteria(facetFormArrayIndex : number) : FormArray {
    return this.facetsFormArray().at(facetFormArrayIndex).get("criteria") as FormArray;
  }

  // new skill
  newCriteria(score : number) : FormGroup {
    return this.fb.group({
      criteriaID :'',
      content : ['' , [
        Validators.required,
        Validators.maxLength(250)
      ]],
      score : score
    });
  }

  addCriteria(facetFormArrayIndex : number, score : number){
    this.facetCriteria(facetFormArrayIndex).push(this.newCriteria(score));
  }

  addAllCriteriaForFacet(facetFormArrayIndex : number) {
    for (let i = 0; i < this.scoreArray.length; i++) {
      this.addCriteria(facetFormArrayIndex, this.scoreArray[i]);
    }
  }

  removeCriteria(facetFormArrayIndex : number, criteriaIndex : number){
    this.facetCriteria(facetFormArrayIndex).removeAt(criteriaIndex);
  }

  ngOnInit(): void {
    this.setUpScoreArray();
    if (!this.isEditing){
      this.addFacet();
    }
  }

  async onSubmit(){
    if (this.facetForm.status === 'VALID'){

      let facetArray =this.facetForm.value["facets"];
      for (let i = 0; i < facetArray.length; i++) {
        //facetArray[i]


        let facetToAdd : Facet = new Facet(
          facetArray[i].facetName,
          facetArray[i].facetDescription,
          new Date( Date.now()),
          new Date( Date.now()),
          true,
          facetArray[i].criteria
        );
        // this.rubric.facets.push(facetToAdd);

        let returnedFacet : Facet | null;

        try {
          returnedFacet = await this.rubricDataService.addNewFacet(this.rubric._id, facetToAdd);

          console.log("returned facet that was added");
          console.log(returnedFacet);

          console.log("facet to Add criteria")
          console.log(facetToAdd.criteria);

          returnedFacet.criteria = facetToAdd.criteria;
          console.log("returned facet with criteria added");
          console.log(returnedFacet);
          try {
            let tempCriteriaList : Criteria[] = [];

            for (let criteria of returnedFacet.criteria) {
              let returnedCriteria = await this.rubricDataService
                .addNewCriteria(this.rubric._id, returnedFacet._id, criteria);


              tempCriteriaList.push(returnedCriteria);
            }
            console.log("Temp criteria list before pushing to list");
            console.log(tempCriteriaList);

            returnedFacet.criteria = [];
            returnedFacet.criteria = tempCriteriaList;


            console.log("returned facet with returned criteria");
            console.log(returnedFacet);

          } catch (e) {
            console.log(e);
          }
          this.rubric.facets.push(facetToAdd);

        } catch (e) {
          console.log(e);
        }
      }
    }

    console.log("Final rubric");
    console.log(this.rubric);

  }

}
