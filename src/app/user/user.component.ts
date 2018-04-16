import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { UserExperienceComponent } from '../user-experience/user-experience.component';
import { UserEducationComponent } from '../user-education/user-education.component';
import { ActivatedRoute } from '@angular/router';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
import { forEach } from '@firebase/util';
import { cleanSession } from 'selenium-webdriver/safari';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: User;
  website = 'www.ds-consultants.eu';
  email = 'info@ds-consultants.eu';
  _languages = [];

  get languages(): Array<string> {
      this._languages = [];
      this._languages.push(...this.user.skillset.languages.main) ;
      this._languages.push(...this.user.skillset.languages.second);
      return this._languages;
  }

  getColumnContent(from: Array<string>, numberOfColumn: number): Array<string> {
    const rowInCol = Math.ceil(from.length / 3);
    const start = (rowInCol * numberOfColumn) - rowInCol;
    const toReturn = [];
    for (let i = start; i < rowInCol * numberOfColumn; i++) {
      toReturn.push(from[i]);
    }
    return toReturn;
  }

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.userService.getUser(this.route.snapshot.paramMap.get('id'))
        .subscribe(user => { this.user = user[0];
        });
  }

  printCV() {
    html2canvas(document.getElementById('cv-page-1')).then((canvasPage1) => {
      html2canvas(document.getElementById('cv-page-2')).then((canvasPage2) => {
        const imgDataPage1 = canvasPage1.toDataURL('image/png');
        const imgDataPage2 = canvasPage2.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgDataPage1, 'JPEG', 0, 0);
        pdf.addPage();
        pdf.addImage(imgDataPage2, 'JPEG', 0, 0);
        pdf.save('download.pdf');
    });
  });
  }
}

