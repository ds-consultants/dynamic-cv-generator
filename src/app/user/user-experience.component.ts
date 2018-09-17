import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-user-experience',
    templateUrl: './user-experience.component.html',
    styleUrls: ['./user-experience.component.css']
})
export class UserExperienceComponent {

    @Input() experience: any;
    @Input() lastExperience: Boolean | false;
    @Input() editForm: Boolean | false;
    @Input() listIndex: number;
    @Input() maxListIndex: number;
    @Output() updateUser = new EventEmitter<any>();
    @Output() editUpdateUser = new EventEmitter<any>();
    @Output() deleteExperienceProject = new EventEmitter<any>();
    @Output() deleteExperience = new EventEmitter<any>();
    @Output() repositionProject = new EventEmitter<any>();
    @Output() repositionExperience = new EventEmitter<any>();
    @Output() addExperienceProject = new EventEmitter<any>();

    saveExperience(key, newValue) {
        if (this.editForm) {
            this.editUpdateUser.emit();
        } else {
            this.updateUser.emit();
        }
    }
    constructor() { }

    removeProject(i) {
        this.deleteProject('projects', i);
    }

    removeMainProject(i) {
        this.deleteProject('mainProjects', i);
    }

    addProject(experience) {
      this.addExperienceProject.emit(experience);
    }

    moveProjectDown(i) {
      this.repositionProject.emit({
        experienceKey: this.listIndex,
        key: 'projects',
        index: i,
        down: true
      });
    }

    moveProjectUp(i) {
      this.repositionProject.emit({
        experienceKey: this.listIndex,
        key: 'projects',
        index: i,
        up: true
      });
    }

    moveExperienceDown() {
      this.repositionExperience.emit({
        index: this.listIndex,
        down: true
      });
    }

    moveExperienceUp() {
      this.repositionExperience.emit({
        index: this.listIndex,
        up: true
      });
    }

    deleteProject(key, index) {
        this.deleteExperienceProject.emit({
            experienceKey: this.listIndex,
            key: key,
            index: index
        });
    }

    removeExperience() {
        this.deleteExperience.emit({
            experienceKey: this.listIndex
        });
    }
}
