import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-prof-expectations',
  templateUrl: './prof-expectations.component.html',
  styleUrls: ['./prof-expectations.component.css']
})
export class ProfExpectationsComponent implements OnInit {

  @Input()  description: string;

  constructor() { }

  ngOnInit() {
  }

}
