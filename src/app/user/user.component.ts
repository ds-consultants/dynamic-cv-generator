import { Component, OnInit } from '@angular/core';
import { User } from '../user';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: User;
  website = 'www.ds-consultants.eu';
  email = 'info@ds-consultants.eu';

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {

    // Retreive the prefetched user
    this.route.data.subscribe(
      (data: { user: User }) => {
        this.user = data.user;
      }
    );
  }
}

