import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-user-experience',
    templateUrl: './user-experience.component.html'
})
export class UserExperienceComponent {

    @Input() experience: any;
    @Input() lastExperience: Boolean | false;
    @Input() editForm: Boolean | false;
    @Input() id: any;
    @Output() updateUser = new EventEmitter<any>();
    @Output() editUpdateUser = new EventEmitter<any>();
    @Output() deleteExperienceProject = new EventEmitter<any>();
    @Output() deleteExperience = new EventEmitter<any>();

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

    deleteProject(key, index) {
        this.deleteExperienceProject.emit({
            experienceKey: this.id,
            key: key,
            index: index
        });
    }

    removeExperience() {
        this.deleteExperience.emit({
            experienceKey: this.id
        });
    }
}
