import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './user-header.component.html'
})
export class UserHeaderComponent {

    @Input() name: string;
    @Input() title: string;
    @Output() updateUser = new EventEmitter<any>();

    saveUser(e) {
        console.log('Name changed: ' + e);
        this.updateUser.emit({name: e});
    }

    constructor() { }

}
