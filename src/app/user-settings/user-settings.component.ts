import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../core/auth/auth.service';
import { NgForm } from '@angular/forms';

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
  photoOptions = [
    'Analyst',
    'AEM',
    'Frontend',
    'Java',
    'Tester'
  ];
  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.data.subscribe(
      (data: { user: User }) => {
        this.user = data.user;
        console.log(this.user.photoURL);
      }
    );
  }

  onSubmit() {
    window.localStorage.setItem('dynamicCvEmail', this.email);
    window.localStorage.setItem('dynamicCvWebsite', this.website);
    this.auth.updateUserData(this.user).then((result) => {
      this.router.navigate(['/user/dashboard']);
    }).catch((error) => {
      console.log(error);
    });
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
    console.log(this.user.photoURL)
  }
}
