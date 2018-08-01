import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-user-education',
    templateUrl: './user-education.component.html',
    styleUrls: ['./user-education.component.css']
})
export class UserEducationComponent {

    @Input() school: any;
    @Input() lastRow = false;
    @Input() edit: boolean;
    @Input() listIndex: number;
    @Input() maxListIndex: number;
    @Input() editForm: boolean | false;
    @Output() delete: EventEmitter<any> = new EventEmitter();
    @Output() updateUser = new EventEmitter<any>();
    @Output() repositionEducation = new EventEmitter<any>();

    constructor() { }

    saveSchool(key, newValue) {
        this.updateUser.emit();
    }

    removeElement() {
        // add remove action
        this.delete.emit(this.listIndex);
    }

    moveEducationDown() {
      this.repositionEducation.emit({
        index: this.listIndex,
        down: true
      });
    }

    moveEducationUp() {
      this.repositionEducation.emit({
        index: this.listIndex,
        up: true
      });
    }
}
