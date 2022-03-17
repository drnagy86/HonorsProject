export class User {
  email: string;
  givenName: string;
  familyName: string;
  active: boolean;

  constructor(email: string, givenName: string, familyName: string, active: boolean = true) {
    this.email = email;
    this.givenName = givenName;
    this.familyName = familyName;
    this.active = active;
  }
}
