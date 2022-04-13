import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {AppRoutingModule} from "./app-routing.module";

import {APP_BASE_HREF} from "@angular/common";

import { HomeListComponent } from './home-list/home-list.component';
import { FrameworkComponent } from './framework/framework.component';
import { AboutComponent } from './about/about.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HtmlLineBreaksPipe } from './html-line-breaks.pipe';
import { RubricDetailsComponent } from './rubric-details/rubric-details.component';
import { DetailsPageComponent } from './details-page/details-page.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { RubricFacetsComponent } from './rubric-facets/rubric-facets.component';
import { CreateRubricComponent } from './create-rubric/create-rubric.component';



@NgModule({
  declarations: [
    HomeListComponent,
    FrameworkComponent,
    AboutComponent,
    HomepageComponent,
    PageHeaderComponent,
    SidebarComponent,
    HtmlLineBreaksPipe,
    RubricDetailsComponent,
    DetailsPageComponent,
    RegisterComponent,
    LoginComponent,
    RubricFacetsComponent,
    CreateRubricComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [{provide: APP_BASE_HREF, useValue:'/'}],
  bootstrap: [FrameworkComponent]

})
export class AppModule { }
