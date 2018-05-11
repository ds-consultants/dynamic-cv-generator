import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../core/auth/auth.service';
import { NgForm } from '@angular/forms';
import { Key } from 'protractor';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {
  education = {
    place: '',
    time: '',
    name: '',
    namePlace: ''
  };
 
  tagsLanguagesMain: Array<any>;
  tagsLanguagesSecond: Array<any>;
  tagsOtherMain: Array<any>;
  tagsOtherSecond: Array<any>;


  website = window.localStorage.getItem('dynamicCvWebsite') || 'www.ds-consultants.eu';
  email = window.localStorage.getItem('dynamicCvEmail') || 'info@ds-consultants.eu';
  showEducationForm = false;
  user: User;
  titleOptions = [
    'Junior Front-end Developer',
    'Senior Front-end Developer',
    'Front-end Developer',
    'CQ/AEM Expert',
    'Junior AEM Developer',
    'Senior AEM Developer',
    'AEM Developer',
    'QA Consultant'
  ];

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private router: Router
  ) {  }

  ngOnInit() {
    this.route.data.subscribe(
      (data: { user: User }) => {
        this.user = data.user;
      }
    );
    this.tagsLanguagesMain = this.user.skillset.languages.main;
    this.tagsLanguagesSecond = this.user.skillset.languages.second;
    this.tagsOtherMain = this.user.skillset.others.main;
    this.tagsOtherSecond = this.user.skillset.others.second;
  }

  save(redirect: boolean) {
    this.auth.updateUserData(this.user).then((result) => {
      if (redirect) {
        this.router.navigate(['/user/dashboard']);
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  onSubmit(f: NgForm) {
    window.localStorage.setItem('dynamicCvEmail', this.email);
    window.localStorage.setItem('dynamicCvWebsite', this.website);
    this.save(true);
  }

  deleteEducation(e) {
    // alert('test' + e);
    if (confirm('delete ?') === true) {
      this.user.education.splice(e, 1);
      // this.save(false);
    }
  }

  addEducation() {
    this.user.education.push(
      {
        name: this.education.name,
        place: this.education.place,
        namePlace: this.education.namePlace,
        time: this.education.time
      }
    );
    this.education.name = '';
    this.education.time = '';
    this.education.place = '';
    this.education.namePlace = '';
    this.showEducationForm = false;
  }

  onAddEducationForm() {
    this.showEducationForm = (this.showEducationForm === true) ? false : true;
  }

  onAddTags() {
    this.user.skillset.others.main = this.tagsOtherMain;;
    this.user.skillset.others.second = this.tagsOtherSecond;
    this.user.skillset.languages.main = this.tagsLanguagesMain;
    this.user.skillset.languages.second = this.tagsLanguagesSecond
  }
  // Notatka: Musze zrobić tak ze do tablicy bede dorzucał cały dodatkowy obiekt z polami o nowych skillach 
  // Pytanie: Jak definiować kolumnę, tzn: Kolumnę mam np Languages ona posiada pola "displayValue": Angular, 

  handleEnterKeyPress(event) {
    const tagName = event.target.tagName.toLowerCase();
    if (tagName !== 'textarea') {
      return false;
    }
  }
}
