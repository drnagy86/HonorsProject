import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import {Criteria, Facet, Rubric, Subject} from "./classes/rubric";
import {lastValueFrom} from "rxjs";
import {environment} from "../environments/environment";
import {User} from "./classes/user";
import {AuthResponse} from "./classes/authResponse";
import {AuthenticationService} from "./authentication.service";
import { BROWSER_STORAGE} from "./classes/storage";



@Injectable({
  providedIn: 'root'
})
export class RubricDataService {

  private apiBaseUrl = environment.apiBaseUrl;

  public getRubrics(): Promise<Rubric[]>{
    //build url
    const url: string = `${this.apiBaseUrl}/rubrics`;

    //https://indepth.dev/posts/1287/rxjs-heads-up-topromise-is-being-deprecated
    // return a promise
    // convert Observable response to a promise
    return lastValueFrom(this.http.get(url))// makes the HTTP GET call to url
      .then(response => response as Rubric[]) // converts response to JSON object of type Rubric
      .catch(this.handleError);

  }

  public getSubjects(): Promise<Subject[]>{
    //build url
    const url: string = `${this.apiBaseUrl}/subjects`;

    // return lastValueFrom(this.http.get(url))// makes the HTTP GET call to url
    //   .then(response => {
    //     console.log(response)
    //     return response as Subject[];
    //   }) // converts response to JSON object of type Subject
    //   .catch(this.handleError);

    return lastValueFrom(this.http.get(url))// makes the HTTP GET call to url
      .then(response => {
        // console.log(response)
        let test = response as Subject[];
        // console.log(test);

        return test;
      }) // converts response to JSON object of type Subject
      .catch(this.handleError);

  }


  public getRubricById(rubricId: string | null): Promise<Rubric>{
    const url: string = `${this.apiBaseUrl}/rubrics/${rubricId}`;

    // console.log(lastValueFrom(this.http.get(url))
    //   .then(response => response as Rubric)
    //   .catch(this.handleError));

    return lastValueFrom(this.http.get(url))
      .then(response => response as Rubric)
      .catch(this.handleError);
  }

  public addSubjectByRubricId(rubricId: string, formData: Subject): Promise<Subject>{
    const url: string = `${this.apiBaseUrl}/rubrics/${rubricId}/subjects`;

    //console.log(formData);

    return lastValueFrom(this.http.post(url, formData))
      .then(response => response as any)
      .catch(this.handleError);
  }

  public addNewFacet(rubricId: string, facetToAdd: Facet) : Promise<Facet> {
    const url: string = `${this.apiBaseUrl}/rubrics/${rubricId}/facets/`;

    return lastValueFrom(this.http.post(url, facetToAdd))
      .then(response => response as any)
      .catch(this.handleError);
  }

  public addNewCriteria(rubricId: string, facetID: string, criteria: Criteria): Promise<Criteria> {
    const url: string = `${this.apiBaseUrl}/rubrics/${rubricId}/facets/${facetID}/Criteria`;

    return lastValueFrom(this.http.post(url, criteria))
      .then(response => response as any)
      .catch(this.handleError);
  }

  public createNewRubric(formData: Rubric): Promise<Rubric> {
    const url: string = `${this.apiBaseUrl}/rubrics`;
    //console.log(this.storage.getItem('rubricMaker-token'));
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization' : `Bearer ${this.storage.getItem('rubricMaker-token')}`
      })
    };
    // formData.rubricCreator = this.authenticationService.getCurrentUser();

    return lastValueFrom(this.http.post(url, formData, httpOptions))
      .then(response => response as Rubric)
      .catch(this.handleError)
      ;
  }

  public updateRubric(oldRubric: Rubric, newRubricName: string, newRubricDescription: string) :Promise<Rubric> {
    const url: string = `${this.apiBaseUrl}/rubrics/${oldRubric._id}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization' : `Bearer ${this.storage.getItem('rubricMaker-token')}`
      })
    };
    let body : any = {
      old_name : oldRubric.name,
      old_description : oldRubric.description,
      new_name : newRubricName,
      new_description : newRubricDescription
    }

    console.log(body);
    // formData.rubricCreator = this.authenticationService.getCurrentUser();

    return lastValueFrom(this.http.put(url, body, httpOptions))
      .then(response => response as Rubric)
      .catch(this.handleError)
      ;
  }
  public updateFacet(rubricID : string, oldFacet: Facet, editedFacet: Facet) : Promise<Facet>  {
    '/rubrics/:rubricid/facets/:facetid'

    // let cleanedUpID : string = oldFacet._id.replace(' ', '');

    const url: string = `${this.apiBaseUrl}/rubrics/${rubricID}/facets/${oldFacet._id}`;
    console.log(url);
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization' : `Bearer ${this.storage.getItem('rubricMaker-token')}`
      })
    };
    let body : any = {
      old_facet_id : oldFacet._id,
      old_description : oldFacet.description,
      new_name : editedFacet._id,
      new_description : editedFacet.description
    }

    console.log(body);
    // formData.rubricCreator = this.authenticationService.getCurrentUser();

    return lastValueFrom(this.http.put(url, body, httpOptions))
      .then(response => response as Facet)
      .catch(this.handleError)
      ;
  }

  public login(user: User): Promise<AuthResponse>{
    return this.makeAuthAPICall('login', user);
  }

  public register(user: User):Promise<AuthResponse>{
    return this.makeAuthAPICall('register', user);
  }

  private makeAuthAPICall(urlPath: string, user: User): Promise<AuthResponse>{
    const url : string = `${this.apiBaseUrl}/${urlPath}`;
    return lastValueFrom(this.http.post(url, user))
      .then(response => response as AuthResponse)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any>{
    console.error('Something went wrong', error);
    return Promise.reject(error.message || error);
  }

  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage : Storage
    ) { }

}
