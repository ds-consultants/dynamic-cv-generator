import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-user-experience',
    templateUrl: './user-experience.component.html'
})
export class UserExperienceComponent {

    @Input() experience: any;
    @Input() lastExperience: Boolean | false;
    @Output() updateUser = new EventEmitter<any>();

    saveExperience(key, newValue) {
        this.updateUser.emit();
    }
    constructor() { }

}
