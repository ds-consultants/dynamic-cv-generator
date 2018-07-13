import { Component, Input, Output, EventEmitter } from '@angular/core';
import { constructDependencies } from '@angular/core/src/di/reflective_provider';
import { Project } from './project';

@Component({
    selector: 'app-project',
    templateUrl: './project.component.html',
    styleUrls: ['./project.component.css']
})
export class ProjectComponent {
    @Input() project: Project;
    @Input() internalProject: Boolean = false;
    @Output() updateUser = new EventEmitter<any>();

    saveProject(key, newValue) {
        this.project[key] = newValue;
        console.log(this.project);
        this.updateUser.emit(this.project);
    }
    constructor() { }
}
