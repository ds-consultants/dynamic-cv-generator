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
        console.log(key);
        console.log(newValue);
        if(this.editForm){
            console.log('1');
            this.editUpdateUser.emit();
        } else {
            console.log('2');
            this.updateUser.emit();
        }
    }
    constructor() { }

    removeProject(i) {
        console.log(this.experience.company + ' project id ' + i);
        this.deleteProject('projects', i);
    }

    removeMainProject(i) {
        console.log(this.experience.company + ' main project id ' + i);
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
