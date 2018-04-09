import { Component, OnInit } from '@angular/core';
import { User } from '../user'
import { UserService } from '../user.service';

import * as html2canvas from "html2canvas";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[];
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsers()
  }

  getUsers(): void {
    this.userService.getUsers()
        .subscribe(users => this.users = users);
  }

  printMe(id): void {
    html2canvas(document.body).then(canvas => {
      let imgData = canvas.toDataURL("image/png");
      // TODO - convert img to pdf
    });
  }
}
