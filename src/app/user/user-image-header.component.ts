import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { User } from '../user';
@Component({
  selector: 'app-user-image-header',
  templateUrl: './user-image-header.component.html',
  styles: []
})
export class UserImageHeaderComponent implements OnInit {

  @Input() imgTitle: Array<any>;
  @Input() imgUrl: string;
  @Input() src: string;
  
  
  constructor() { 
 
  }

  ngOnInit() {
  }

 
}
