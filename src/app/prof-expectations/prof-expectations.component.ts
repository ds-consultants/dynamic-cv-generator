import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-prof-expectations',
  templateUrl: './prof-expectations.component.html',
  styleUrls: ['./prof-expectations.component.css']
})
export class ProfExpectationsComponent {

  @Input()  description: string;

  constructor() { }

 
}
