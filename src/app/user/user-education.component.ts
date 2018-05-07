import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-user-education',
    templateUrl: './user-education.component.html',
    styles: ['.btnremove { float: right; }']
})
export class UserEducationComponent {

    @Input() school: Array<number>;
    @Input() edit: boolean;
    @Input() id: number;
    @Output() delete: EventEmitter<any> = new EventEmitter();

    constructor() { }
    toggleFlag1 = true;

    onToggle1() {
        this.toggleFlag1 = (this.toggleFlag1 === true) ? false : true;
    }

    removeElement() {
        // add remove action
        this.delete.emit(this.id);
    }
}
