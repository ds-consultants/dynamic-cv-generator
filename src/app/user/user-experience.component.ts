import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-user-experience',
    templateUrl: './user-experience.component.html'
})
export class UserExperienceComponent {

    @Input() experience: any;

    constructor() { }

}
