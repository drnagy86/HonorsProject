import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomepageComponent} from "./homepage/homepage.component";
import {AboutComponent} from "./about/about.component";
import {DetailsPageComponent} from "./details-page/details-page.component";
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {CreateRubricComponent} from "./create-rubric/create-rubric.component";
import {FacetsComponent} from "./facets/facets.component";
import {Facet2Component} from "./facet2/facet2.component";

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'rubric/:rubricId',
    component: DetailsPageComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'create-rubric',
    component: CreateRubricComponent
  },
  {
    path: 'edit-rubric/:rubricId',
    component: CreateRubricComponent
  },
  {
    path: 'facets',
    component: FacetsComponent
  },
  {
    path: 'facets2',
    component: Facet2Component
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
