import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  users: Observable<User[]>;
  constructor() { }
}
