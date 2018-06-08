import { Component, Input, Output, EventEmitter  } from '@angular/core';

@Component({
  selector: 'app-user-footer',
  templateUrl: './user-footer.component.html'
})
export class UserFooterComponent {
  @Input() website: string;
  @Input() email: string;
  @Output() updateFooter = new EventEmitter<any>();

  constructor() { }

  saveProject(key, newValue) {
    window.localStorage.setItem(key, newValue);
  }

}
