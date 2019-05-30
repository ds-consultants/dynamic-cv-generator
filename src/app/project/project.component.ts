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
    @Input() internalProject: boolean | false;
    @Input() listIndex: number;
    @Input() maxListIndex: number;
    @Input() editForm: boolean | false;
    @Output() updateUser = new EventEmitter<any>();
    @Output() moveProjectUp = new EventEmitter<any>();
    @Output() moveProjectDown = new EventEmitter<any>();

    saveProject(key, newValue) {
        this.project[key] = newValue;
        this.updateUser.emit(this.project);
    }

    constructor() { }
}
