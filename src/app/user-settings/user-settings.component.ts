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
  experience = {
    company: '',
    position: '',
    projects: [],
    time: '',
    mainProjects: []
  };
  project = {
    name: '',
    title: '',
    desc: '',
    technologies: ''
  };
  mainProject = {
    desc: '',
    technologies: ''
  };
  website = window.localStorage.getItem('dynamicCvWebsite') || 'www.ds-consultants.eu';
  email = window.localStorage.getItem('dynamicCvEmail') || 'info@ds-consultants.eu';
  showEducationForm = false;
  showExperienceForm = false;
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
        console.log(this.user);
      }
    );
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

  addExperience() {
    console.log('save');
    this.user.experience.push(
      {
        company: this.experience.company,
        position: this.experience.position,
        projects: this.experience.projects,
        time: this.experience.time,
        mainProjects: this.experience.mainProjects
      }
    );
  }

  onAddEducationForm() {
    this.showEducationForm = (this.showEducationForm === true) ? false : true;
  }

  onAddExperienceForm() {
    this.showExperienceForm = (this.showExperienceForm === true) ? false : true;
  }

  updateUser(event) {
    this.save(false);
  }

  addMainProject() {
    this.experience.mainProjects.push(
      {
        desc: this.mainProject.desc,
        technologies: this.mainProject.technologies.split(',')
      }
    );
    this.mainProject.desc = '';
    this.mainProject.technologies = '';
  }

  addProject() {
    this.experience.projects.push(
      {
        name: this.project.name,
        title: this.project.title,
        desc: this.project.desc,
        technologies: this.project.technologies.split(',')
      }
    );
    this.project.desc = '';
    this.project.technologies = '';
    this.project.name = '';
    this.project.title = '';
  }

  deleteExperienceProject(event) {
    console.log(event);
    console.log(this.user.experience[event.experienceKey][event.key][event.index])
    this.user.experience[event.experienceKey][event.key].splice(event.index, 1);
  }

  deleteExperience(event) {
    console.log(event);
    this.user.experience.splice(event.index, 1);
  }
}
