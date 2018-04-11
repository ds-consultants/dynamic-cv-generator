import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-education',
  templateUrl: './user-education.component.html',
  styleUrls: ['./user-education.component.css']
})
export class UserEducationComponent {

  @Input() school: Array<number>;

  constructor() { }

}
