import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../core/auth/auth.service';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { TagModel } from 'ngx-chips/core/accessor';
import { AppComponent } from '../app.component';
import { moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
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
        Object.keys(this.user.skillset).forEach((key, index) => {
          if (this.user.skillset[key].position === undefined) {
            this.user.skillset[key].position = index;
            this.save(false);
          }
        })
      }
    );

    this.checkNewHireExperienceButtonState();
  }


  checkNewHireExperienceButtonState(): void {
    this.showNewHireExperienceButton = this.user.experience.some(x => x.company.includes('Dynamic Solutions'));
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
    this.skillsetNames.forEach(name => {
      this.user.skillset[name].main = this.prepareSkills(this.user.skillset[name].main);
      this.user.skillset[name].second = this.prepareSkills(this.user.skillset[name].second);
    });
    this.auth.updateUserData(this.user).then((result) => {
      AppComponent.showSavingIndicator();
      if (redirect) {
        this.router.navigate(['/user/dashboard']);
      }
    }).catch((error) => {
      console.error(error);
      AppComponent.showError('Something goes wrong. User data are not saved. Please open that page in another tab to check which data are not saved properly.');
    });
  }

  onSubmit(f: NgForm) {
    this.save(true);
  }

  deleteEducation(e) {
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
    this.showEducationForm = false;
    this.emptyEducation();
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

    this.emptyExperience();
    this.emptyProject();
    this.emptyMainProject();

    this.save(false);
  }

  addNewHireExperience() {
    const currentDate = new Date();
    const currentDateMonthString = currentDate.toLocaleString('en-us', { month: 'long' });

    this.user.experience.unshift(
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
      delete this.user.skillset[skillName];
      this.save(false);
    }
  }

  addNewSkillset() {
    this.toggleSkillsetForm();
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
    this.emptyMainProject();
  }

  addProject() {
    const pushProject = () => {
      this.experience.projects.push(
        {
          name: this.project.name,
          title: this.project.title,
          desc: this.project.desc,
          technologies: this.prepareSkills(this.project.technologies)
        }
      );
      this.emptyProject();
    };

    const confirmationText = (variable) => {
      return `Are you sure you want to add this Project? \n` +
        `Project ${variable} is empty and there won\'` +
        `be possibility to edit it later`;
    };

    if ( this.project.name === '' &&
        confirm(confirmationText('name')) === true ) {
      pushProject();
    } else if ( this.project.title === '' &&
        confirm(confirmationText('title')) === true ) {
      pushProject();
    } else if (this.project.name !== '' && this.project.title !== '') {
      pushProject();
    }
  }

  addExperienceProject(experience) {
      experience.projects.push(
      {
        name: 'Project name',
        title: 'role name',
        desc: 'Project description',
        technologies: this.prepareSkills(['tachnology name'])
      }
    );

    this.save(false);
  }

  deleteNewExperienceProject(event) {
    this.experience[event.key].splice(event.index, 1);
  }

  deleteNewExperience(event) {
    this.emptyExperience();
    this.emptyProject();
    this.emptyMainProject();
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

  emptyExperience() {
    this.experience = {
      company: '',
      position: '',
      projects: [],
      time: '',
      mainProjects: []
    };
  }

  emptyProject() {
    this.project = {
      name: '',
      title: '',
      desc: '',
      technologies: ''
    };
  }

  emptyMainProject() {
    this.mainProject = {
      desc: '',
      technologies: ''
    };
  }

  emptyEducation() {
    this.education = {
      place: '',
      time: '',
      name: '',
      namePlace: ''
    };
  }

  repositionProject(event) {
    const array = this.user.experience[event.experienceKey][event.key];

    moveItemInArray(array, event.previousIndex, event.currentIndex);

    this.save(false);
  }

  repositionExperience(event) {
    const array = this.user.experience;

    this.repositionElementInArray(array, event.index, event.up, event.down);

    this.save(false);
  }

  repositionEducation(event) {
    const array = this.user.education;

    this.repositionElementInArray(array, event.index, event.up, event.down);

    this.save(false);
  }

  repositionSkillsetGroup({index, up, down}) {
    const array = this.user.skillset;
    const key = this.skillsetNames[index];
    let keyToReplace;
    if (down) {
      keyToReplace = this.skillsetNames[index + 1];
      this.user.skillset[key].position = index + 1;
    } else if (up) {
      keyToReplace = this.skillsetNames[index - 1];
      this.user.skillset[key].position = index - 1;
    }
    this.user.skillset[keyToReplace].position = index;

    this.save(false);
  }

  repositionElementInArray(array, elementPosition, up, down) {

    const temp_array = array.slice();
    const i = elementPosition;

    if (down && i + 1 < temp_array.length) {
      array[i + 1] = temp_array[i];
      array[i] = temp_array[i + 1];
    } else if (up && i - 1 >= 0) {
      array[i - 1] = temp_array[i];
      array[i] = temp_array[i - 1];
    }
  }

  get skillsetNames() {
    return Object.keys(this.user.skillset).sort((a, b) => this.user.skillset[a].position - this.user.skillset[b].position);
  }

}
