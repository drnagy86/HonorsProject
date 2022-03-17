import { Injectable } from '@angular/core';
import {Router, NavigationEnd, RouterEvent} from "@angular/router";
import {filter} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  private urls : string[] = [];

  // help from
//https://stackoverflow.com/questions/49722369/angular-router-events-navigationend-how-to-filter-only-the-last-event
  constructor(private router: Router) {
    // this.router.events
    //   .pipe(filter(routerEvent => routerEvent instanceof NavigationEnd))
    //   // .subscribe(routerEvent => {
    //   //   routerEvent =()routerEvent;
    //   // })
    //   // .subscribe((routerEvent: RouterEvent) => {
    //   //   const url = routerEvent.url;
    //   //   this.urls = [...this.urls, url];
    //   .subscribe(event => {
    //
    //   });
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .forEach(next => {
            const url = next.url;
            this.urls = [...this.urls, url];
      })

  }
}

