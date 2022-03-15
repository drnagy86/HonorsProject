import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public pageContent = {
    header: {
      title : 'About Rubric Maker',
      strapline: '',
    },
    content : 'Rubric Maker is an app by Derrick Nagy.\nIt was created for his Honors Project at Kirkwood Community College for the Spring 2022 semester.'
  }

}
