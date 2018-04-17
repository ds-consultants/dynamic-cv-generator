import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-prof-expectations',
  templateUrl: './user-prof-expectations.component.html'
})
export class UserProfExpectationsComponent {

  @Input() description: string;

  constructor() { }
}
