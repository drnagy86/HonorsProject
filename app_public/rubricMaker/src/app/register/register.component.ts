import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import {User} from "../classes/user";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public formErrors: string = '';

  public credentials = {
    email: '',
    givenName: '',
    familyName: '',
    password: '',
    retypePassword: ''
  };

  public pageContent = {
    header: {
      title: 'Create a new account',
      strapline: ''
    },
    sidebar: ''
  };

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
  }

  public onRegisterSubmit() : void {
    this.formErrors = '';
    if (
      !this.credentials.givenName ||
      !this.credentials.familyName ||
      !this.credentials.email ||
      !this.credentials.password
      //|| !this.credentials.retypePassword
    ) {
      this.formErrors = 'All fields required. Please fill them out.'
    } else {
      this.doRegister();
    }
  }

  ngOnInit() {
  }

  private doRegister() : void {
    this.authenticationService.register(this.credentials)
      .then(() => this.router.navigateByUrl('/'))
      .catch((message) => this.formErrors = message);

  }
}
