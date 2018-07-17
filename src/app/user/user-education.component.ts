import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-user-education',
    templateUrl: './user-education.component.html',
    styles: ['.btnremove { float: right; }']
})
export class UserEducationComponent {

    @Input() school: any;
    @Input() lastRow = false;
    @Input() edit: boolean;
    @Input() id: number;
    @Output() delete: EventEmitter<any> = new EventEmitter();
    @Output() updateUser = new EventEmitter<any>();

    constructor() { }

    saveSchool(key, newValue) {
        this.updateUser.emit();
    }

    removeElement() {
        // add remove action
        this.delete.emit(this.id);
    }
}
