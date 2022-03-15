import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";

//https://stackoverflow.com/questions/34535163/angular-2-router-no-base-href-set
import {APP_BASE_HREF} from "@angular/common";


import { AppRoutingModule } from './app-routing.module';
import { HomeListComponent } from './home-list/home-list.component';
import { FrameworkComponent } from './framework/framework.component';
import { AboutComponent } from './about/about.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HtmlLineBreaksPipe } from './html-line-breaks.pipe';

@NgModule({
  declarations: [
    HomeListComponent,
    FrameworkComponent,
    AboutComponent,
    HomepageComponent,
    PageHeaderComponent,
    SidebarComponent,
    HtmlLineBreaksPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomepageComponent
      }, {
        path: 'about',
        component: AboutComponent
      }
    ])
  ],
  providers: [{provide: APP_BASE_HREF, useValue:'/'}],
  bootstrap: [FrameworkComponent]

})
export class AppModule { }
