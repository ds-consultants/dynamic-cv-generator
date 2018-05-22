import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-project',
    templateUrl: './project.component.html',
    styleUrls: ['./project.component.css']
})
export class ProjectComponent {

    @Input() project: Object;
    @Input() internalProject: Boolean = false;
    @Output() updateUser = new EventEmitter<any>();

    saveProject(key, newValue) {
        this.updateUser.emit();
    }
    constructor() { }

}
