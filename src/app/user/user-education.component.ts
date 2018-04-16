import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-education',
  templateUrl: './user-education.component.html'
})
export class UserEducationComponent {

  @Input() school: Array<number>;

  constructor() { }

}
