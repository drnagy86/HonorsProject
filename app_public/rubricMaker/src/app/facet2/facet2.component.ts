import {AfterContentInit, AfterViewInit, Component, EventEmitter, Input, OnInit} from '@angular/core';
import {FormGroup, FormArray, FormBuilder, Validators} from '@angular/forms'
import {Criteria, Facet, Rubric} from "../classes/rubric";
import {RubricDataService} from "../rubric-data.service";
import {Router} from "@angular/router";



@Component({
  selector: 'app-facet2',
  templateUrl: './facet2.component.html',
  styleUrls: ['./facet2.component.css']
})
export class Facet2Component implements OnInit, AfterContentInit, AfterViewInit {
  facetForm : FormGroup = this.fb.group({
    facets : this.fb.array([]),
  });

  public scoreArray: number[] = [];
  @Input() rubric!: Rubric;
  @Input() topScore!: number;
  @Input() bottomScore!: number;
  @Input() isEditing! : boolean;

  constructor(
    private rubricDataService: RubricDataService,
    private fb:FormBuilder,
    private router : Router
  ) {
  }

  setUpScoreArray() {
    this.scoreArray = [];

    if (!this.isEditing){
      for (let i = this.bottomScore; i < this.topScore + 1; i++) {
        this.scoreArray.push(i);
      }
    } else {
      console.log('test');
      for (let criterion of this.rubric.facets[0].criteria) {
        this.scoreArray.push(criterion.score);
      }
    }
  }

  facetsFormArray():FormArray{
    return this.facetForm.get("facets") as FormArray;
  }

  newFacet(): FormGroup {
    return this.fb.group({
      _id : ['' , [ ]],
      name : ['' , [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(100)
      ]],
      description : ['' , [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(500)
      ]],
      criteria: this.fb.array([])
    });
  }

  async addFacet() {
    this.facetsFormArray().push(this.newFacet());
    this.addAllCriteriaForFacet(this.facetsFormArray().length-1);

  }

  async removeFacet(facetFormArrayIndex: number) {

    let facetID: string = this.rubric.facets[facetFormArrayIndex]._id;

    this.facetsFormArray().removeAt(facetFormArrayIndex);

    if (this.isEditing) {
      try {
        await this.rubricDataService.deleteFacetByRubricID(this.rubric._id, facetID);
      } catch (e) {
        console.log(e);
      }

    }

  }

  // employeeSkills
  facetCriteria(facetFormArrayIndex : number) : FormArray {
    return this.facetsFormArray().at(facetFormArrayIndex).get("criteria") as FormArray;
  }

  // new skill
  newCriteria(score : number) : FormGroup {
    return this.fb.group({
      _id :'',
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
    // if (!this.isEditing){
    //   this.addFacet();
    // }
  }

  ngAfterContentInit() {

    for (let facet of this.rubric.facets) {
      this.addFacet();
    }
    this.facetForm.patchValue(this.rubric);
  }

  async onSubmit(){

    if (this.facetForm.status === 'VALID'){

      let facetArray =this.facetForm.value["facets"];
      for (let i = 0; i < facetArray.length; i++) {
        //facetArray[i]

        let facetToAdd : Facet = new Facet(
          facetArray[i]._id,
          facetArray[i].name,
          facetArray[i].description,
          new Date( Date.now()),
          new Date( Date.now()),
          true,
          facetArray[i].criteria
        );
        // this.rubric.facets.push(facetToAdd);

        let returnedFacet : Facet | null;

        try {
          returnedFacet = await this.rubricDataService.addNewFacet(this.rubric._id, facetToAdd);

          // console.log("returned facet that was added");
          // console.log(returnedFacet);
          //
          // console.log("facet to Add criteria")
          // console.log(facetToAdd.criteria);

          returnedFacet.criteria = facetToAdd.criteria;
          // console.log("returned facet with criteria added");
          // console.log(returnedFacet);
          try {
            let tempCriteriaList : Criteria[] = [];

            for (let criteria of returnedFacet.criteria) {
              let returnedCriteria = await this.rubricDataService
                .addNewCriteria(this.rubric._id, returnedFacet._id, criteria);


              tempCriteriaList.push(returnedCriteria);
            }
            // console.log("Temp criteria list before pushing to list");
            // console.log(tempCriteriaList);

            returnedFacet.criteria = [];
            returnedFacet.criteria = tempCriteriaList;


            // console.log("returned facet with returned criteria");
            // console.log(returnedFacet);

          } catch (e) {
            console.log(e);
          }
          this.rubric.facets.push(facetToAdd);
          // redirect to details page
          await this.router.navigate([`/rubric/${this.rubric._id}`]);

        } catch (e) {
          console.log(e);
        }
      }
    }
  }

  ngAfterViewInit(): void {
    // for (let i = 0; i < this.facetsFormArray().length; i++) {
    //   let result = this.facetForm.get('_id')?.touched;
    // }

  }

  async makeEditsToFacets() {
    if (this.facetForm.status === 'VALID') {
      let facetArray = this.facetForm.value["facets"];
      let facetEdits : Facet[] = [];

      for (let facetArrayElement of facetArray) {
        facetEdits.push(new Facet(
          facetArrayElement._id,
          facetArrayElement.name,
          facetArrayElement.description,
          new Date( Date.now()),
          new Date( Date.now()),
          true,
          facetArrayElement.criteria
        ));
      };

      let tempFacetArray : Facet[] = [];

      for (let i = 0; i < facetEdits.length; i++) {
        try {
          await this.rubricDataService.updateFacet(this.rubric._id, this.rubric.facets[i] , facetEdits[i])
            .then( async facet => {

              //console.log(facet);

              for (let j = 0; j < facetEdits[i].criteria.length; j++) {
                // rubricID, facetID, oldCriterion, newCriterion
                // console.log("RubricID");
                // console.log(this.rubric._id);
                // console.log("FacetID");
                // console.log(facet._id);
                // console.log("OldCriteria");
                // console.log(this.rubric.facets[i].criteria[j]);
                // console.log("NewCriteria");
                // console.log(facetEdits[i].criteria[j]);

                await this.rubricDataService.updateCriterion(this.rubric._id, facet._id, this.rubric.facets[i].criteria[j], facetEdits[i].criteria[j])
                  .then( c => facet.criteria.push(c)).catch(e => console.log(e));
              }

              tempFacetArray.push(facet);
            });
        } catch (e) {
          console.log(e);
        }
      }
      this.rubric.facets = tempFacetArray;

      // redirect to details page
      await this.router.navigate([`/rubric/${this.rubric._id}`]);

    }

  }
}
