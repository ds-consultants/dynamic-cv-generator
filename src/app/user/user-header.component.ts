import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './user-header.component.html'
})
export class UserHeaderComponent {

    @Input() name: string;
    @Input() title: string;

    constructor() { }

}
