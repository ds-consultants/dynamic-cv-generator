import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-footer',
  templateUrl: './user-footer.component.html'
})
export class UserFooterComponent {
  @Input() website: string;
  @Input() email: string;

  constructor() { }

}
