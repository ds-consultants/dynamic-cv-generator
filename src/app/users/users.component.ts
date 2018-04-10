import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { User } from '../user'
import { UserService } from '../user.service';

import * as html2canvas from "html2canvas";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: Observable<User[]>;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.users = this.userService.getUsers();
  }

  printMe(id): void {
    html2canvas(document.body).then(canvas => {
      let imgData = canvas.toDataURL("image/png");
      // TODO - convert img to pdf
    });
  }
}
