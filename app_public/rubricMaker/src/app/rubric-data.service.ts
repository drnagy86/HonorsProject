import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import {Rubric, Subject} from "./classes/rubric";
import {lastValueFrom} from "rxjs";
import {environment} from "../environments/environment";
import {User} from "./classes/user";
import {AuthResponse} from "./classes/authResponse";


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

  constructor(private http: HttpClient) { }


}
