import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-prof-expectations',
    templateUrl: './user-prof-expectations.component.html'
})
export class UserProfExpectationsComponent {

    @Input() proffesionalExpectations: string;
    @Input() personalNote: string;

    constructor() { }
}
