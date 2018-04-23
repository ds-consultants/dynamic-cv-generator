import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-personal-note',
    templateUrl: './user-personal-note.component.html'
})
export class UserPersonalNoteComponent {

    @Input() description: string;

    constructor() { }

}
