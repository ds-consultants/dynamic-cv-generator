import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../core/auth/auth.service';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TagModel } from 'ngx-chips/core/accessor';

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
  skillNames = [];
  newSkillset = '';
  website = window.localStorage.getItem('dynamicCvWebsite') || 'www.ds-consultants.eu';
  email = window.localStorage.getItem('dynamicCvEmail') || 'info@ds-consultants.eu';
  showEducationForm = false;
  showSkillsetForm = false;
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
  ) { }

  ngOnInit() {
    this.route.data.subscribe(
      (data: { user: User }) => {
        this.user = data.user;
        this.skillNames = Object.keys(this.user.skillset);
      }
    );
  }

  prepareSkills(skill): Array<any> {
    const cleanCopy = [];
    skill.forEach(name => {
      if (typeof name === 'string') {
        cleanCopy.push(name);
      } else {
        cleanCopy.push(name.value);
      }
    });
    return cleanCopy;
  }

  save(redirect: boolean) {
    this.skillNames.forEach(name => {
      this.user.skillset[name].main = this.prepareSkills(this.user.skillset[name].main);
      this.user.skillset[name].second = this.prepareSkills(this.user.skillset[name].second);
    });

    console.log(this.user.skillset);
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

  toggleSkillsetForm() {
    this.showSkillsetForm = !this.showSkillsetForm;
  }

  removeSkillset(skillName) {
    if (confirm('delete ?') === true) {
      const index = this.skillNames.indexOf(skillName, 0);
      if (index > -1) {
        this.skillNames.splice(index, 1);
        delete this.user.skillset[skillName];
      }
    }
  }

  addNewSkillset() {
    console.log(this.newSkillset);
    this.toggleSkillsetForm();
    this.skillNames.push(this.newSkillset);
    this.user.skillset[this.newSkillset] = { main: [], second: [] };
  }

  onAddEducationForm() {
    this.showEducationForm = (this.showEducationForm === true) ? false : true;
  }
}
