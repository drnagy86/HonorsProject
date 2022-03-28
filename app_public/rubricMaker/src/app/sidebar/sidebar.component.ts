import { Component, OnInit, Input } from '@angular/core';
import {Rubric} from "../classes/rubric";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {



  @Input() content: Rubric | any;

  constructor() { }

  ngOnInit(): void {
  }

}
