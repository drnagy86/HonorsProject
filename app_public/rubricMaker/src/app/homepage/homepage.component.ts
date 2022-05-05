import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public pageContent = {
    header : {
      title : 'Rubric Maker',
      strapline : 'View the analytic rubrics on the site. Sign in or sign up to create your own.'
    },
    sidebar : 'Create analytic rubrics for your courses.'
};


}
