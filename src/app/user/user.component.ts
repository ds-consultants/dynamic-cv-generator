import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: User;
  website = 'www.ds-consultants.eu';
  email = 'info@ds-consultants.eu';

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.userService.getUser(this.route.snapshot.paramMap.get('id'))
      .subscribe(user => { this.user = user[0]; });
  }

  printCV() {
    html2canvas(document.getElementById('cv')).then((canvas) => {
      console.log('Pring me');
    });
  }
}

