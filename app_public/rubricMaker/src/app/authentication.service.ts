import {Inject, Injectable } from '@angular/core';
import {BROWSER_STORAGE} from "./classes/storage";
import {User} from "./classes/user";
import {AuthResponse} from "./classes/authResponse";
import {RubricDataService} from "./rubric-data.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage, private rubricDataService : RubricDataService)
  {}

  public getToken(): string | null {
    return this.storage.getItem('rubricMaker-token');
  }

  public saveToken(token : string): void {
    this.storage.setItem('rubricMaker-token', token);
  }

  public logout() : void {
    this.storage.removeItem('rubricMaker-token');
  }

  public login(user: User | any): Promise<any> {
    return this.rubricDataService.login(user)
      .then((authResp: AuthResponse) => this.saveToken(authResp.token));
  }

  public register(user: User | any): Promise<any> {
    return this.rubricDataService.register(user)
      .then((authResp: AuthResponse) => this.saveToken(authResp.token));
  }

  public isLoggedIn() : boolean {
    const token: string | null = this.getToken();
    if (token){
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > (Date.now() / 1000);
    } else {
      return false;
    }
  }

  public getCurrentUser(): User | any {
    if (this.isLoggedIn()){
      const token : string | any = this.getToken();
      const {email, givenName, familyName, active } = JSON.parse(atob(token.split('.')[1]));
      return new User(email, givenName, familyName, active);
    }
  }


}

