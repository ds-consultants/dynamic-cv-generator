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
  _others = [];

  get languages(): Array<{name: string, main: boolean}> {
      this._languages = [];
      if (this.user) {
        for (let index = 0; index < this.user.skillset.languages.main.length; index++) {
          this._languages.push({name: this.user.skillset.languages.main[index], main: true});
        }
        for (let index = 0; index < this.user.skillset.languages.second.length; index++) {
          this._languages.push({name: this.user.skillset.languages.second[index], main: false});
        }
        // this._languages.push(...this.user.skillset.languages.main) ;
        // this._languages.push(...this.user.skillset.languages.second);
      }
      return this._languages;
  }

  get others(): Array<{name: string, main: boolean}> {
    this._others = [];
    if (this.user) {
      for (let index = 0; index < this.user.skillset.others.main.length; index++) {
        this._others.push({name: this.user.skillset.others.main[index], main: true});
      }
      for (let index = 0; index < this.user.skillset.others.second.length; index++) {
        this._others.push({name: this.user.skillset.others.second[index], main: false});
      }
      // this._others.push(...this.user.skillset.others.main) ;
      // this._others.push(...this.user.skillset.others.second);
    }
    return this._others;
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

