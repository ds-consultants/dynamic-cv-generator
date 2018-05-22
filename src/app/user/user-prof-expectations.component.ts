import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-prof-expectations',
    templateUrl: './user-prof-expectations.component.html'
})
export class UserProfExpectationsComponent {

    @Input() proffesionalExpectations: string;
    @Input() personalNote: string;
    @Output() updateUser = new EventEmitter<any>();

    constructor() { }

    savePersonalInfo(key, newValue) {
        const params = new Object;
        params[key] = newValue;
        this.updateUser.emit(params);
    }

}
