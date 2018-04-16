import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-experience',
  templateUrl: './user-experience.component.html',
  styleUrls: ['./user-experience.component.css']
})
export class UserExperienceComponent {

  @Input() experience: Array<number>;

  constructor() { }

}
