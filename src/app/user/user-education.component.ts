import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-user-education',
    templateUrl: './user-education.component.html',
    styles: ['.btnremove { float: right; }']
})
export class UserEducationComponent {

    @Input() school: Array<number>;
    @Input() lastRow = false;
    @Input() edit: boolean;
    @Input() id: number;
    @Output() delete: EventEmitter<any> = new EventEmitter();

    constructor() { }

    removeElement() {
        // add remove action
        this.delete.emit(this.id);
    }
}
