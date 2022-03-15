import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import {Rubric} from "./home-list/home-list.component";
import {lastValueFrom} from "rxjs";


// Build the URL to call.
//   Tell the HTTP service to make a request for the URL.
//   Convert the Observable response to a Promise.
//   Convert the response to JSON.
//   Return the response.
//   Catch, handle, and return errors.


@Injectable({
  providedIn: 'root'
})
export class RubricDataService {

  private apiBaseUrl = 'http://localhost:3000/api';

  public getRubrics(): Promise<Rubric[]>{
    //build url
    const url: string = `${this.apiBaseUrl}/rubrics`;

    //https://indepth.dev/posts/1287/rxjs-heads-up-topromise-is-being-deprecated
    // return a promise
    // convert Obserbable response to a promise
    return lastValueFrom(this.http.get(url))// makes the HTTP GET call to url
      .then(response => response as Rubric[]) // converts response to JSON object of type Rubric
      .catch(this.handleError);

    // deprecated
    // return this.http
    //   .get(url)
    //   .toPromise()
    //   .then(response => response as Location[])
    //   .catch(this.handleError);
  }

  private handleError(error: any): Promise<any>{
    console.error('Something went wrong', error);
    return Promise.reject(error.message || error);
  }

  constructor(private http: HttpClient) { }
}
