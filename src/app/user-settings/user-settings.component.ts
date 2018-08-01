import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../core/auth/auth.service';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
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
  showNewHireExperienceButton = true;
  skillNames = [];
  newSkillset = '';
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

    this.checkNewHireExperienceButtonState();
  }


  checkNewHireExperienceButtonState(): void {
    this.showNewHireExperienceButton = this.user.experience.find(x => x.company.includes('Dynamic Solutions')) || true;
  }

  prepareSkills(skill): Array<any> {
    const cleanCopy = [];
    if (skill.length > 0) {
      skill.forEach(name => {
        if (typeof name === 'string') {
          cleanCopy.push(name);
        } else {
          cleanCopy.push(name.value);
        }
      });
    }
    return cleanCopy;
  }

  save(redirect: boolean) {
    this.skillNames.forEach(name => {
      this.user.skillset[name].main = this.prepareSkills(this.user.skillset[name].main);
      this.user.skillset[name].second = this.prepareSkills(this.user.skillset[name].second);
    });
    this.auth.updateUserData(this.user).then((result) => {
      if (redirect) {
        this.router.navigate(['/user/dashboard']);
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  onSubmit(f: NgForm) {
    this.save(true);
  }

  deleteEducation(e) {
    // alert('test' + e);
    if (confirm('delete ?') === true) {
      this.user.education.splice(e, 1);
      this.save(false);
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
    this.save(false);
  }

  addExperience() {
    this.user.experience.push(
      {
        company: this.experience.company,
        position: this.experience.position,
        projects: this.experience.projects,
        time: this.experience.time,
        mainProjects: this.experience.mainProjects
      }
    );
    this.showExperienceForm = (this.showExperienceForm === true) ? false : true;
    this.save(false);
  }

  addNewHireExperience() {
    const currentDate = new Date();
    const currentDateMonthString = currentDate.toLocaleString('en-us', { month: 'long' });

    this.user.experience.push(
      {
        company: 'Dynamic Solutions',
        position: this.user.title,
        time: currentDate.getFullYear() + '-present',
        mainProjects: [
          {
            desc: `New hire. Start ${currentDateMonthString}, 1st`
          }]
      }
    );
    this.checkNewHireExperienceButtonState();

    this.save(false);
  }

  toggleSkillsetForm() {
    this.showSkillsetForm = !this.showSkillsetForm;
  }

  renameSkillset(prevSkillName, skillName) {
    if (prevSkillName !== skillName) {
      this.user.skillset[skillName] = this.user.skillset[prevSkillName];
      delete this.user.skillset[prevSkillName];
    }
    this.save(false);
  }

  removeSkillset(skillName) {
    if (confirm('delete ?') === true) {
      const index = this.skillNames.indexOf(skillName, 0);
      if (index > -1) {
        this.skillNames.splice(index, 1);
        delete this.user.skillset[skillName];
      }
      this.save(false);
    }
  }

  addNewSkillset() {
    this.toggleSkillsetForm();
    this.skillNames.push(this.newSkillset);
    this.user.skillset[this.newSkillset] = { main: [], second: [] };
    this.save(false);
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
        technologies: this.prepareSkills(this.mainProject.technologies)
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
        technologies: this.prepareSkills(this.project.technologies)
      }
    );
    this.project.desc = '';
    this.project.technologies = '';
    this.project.name = '';
    this.project.title = '';
  }

  deleteNewExperienceProject(event) {
    console.log(event);
    this.experience[event.key].splice(event.index, 1);
  }

  deleteNewExperience(event) {
    this.experience = {
      company: '',
      position: '',
      projects: [],
      time: '',
      mainProjects: []
    };
    this.project = {
      name: '',
      title: '',
      desc: '',
      technologies: ''
    };
    this.mainProject = {
      desc: '',
      technologies: ''
    };
  }

  deleteExperienceProject(event) {
    this.user.experience[event.experienceKey][event.key].splice(event.index, 1);
    this.save(false);
  }

  deleteExperience(event) {
    this.user.experience.splice(event.experienceKey, 1);
    this.checkNewHireExperienceButtonState();
    this.save(false);
  }

  repositionProject(event) {
    const array = this.user.experience[event.experienceKey][event.key];
    const temp_array = array.slice();
    const i = event.index;

    if (event.down && event.index + 1 < temp_array.length) {
      array[i + 1] = temp_array[i];
      array[i] = temp_array[i + 1];
    } else if (event.up && event.index - 1 >= 0) {
      array[i - 1] = temp_array[i];
      array[i] = temp_array[i - 1];
    }

    this.save(false);
  }

  repositionExperience(event) {
    const array = this.user.experience;
    const temp_array = array.slice();
    const i = event.index;

    if (event.down && event.index + 1 < temp_array.length) {
      array[i + 1] = temp_array[i];
      array[i] = temp_array[i + 1];
    } else if (event.up && event.index - 1 >= 0) {
      array[i - 1] = temp_array[i];
      array[i] = temp_array[i - 1];
    }

    this.save(false);
  }

}
