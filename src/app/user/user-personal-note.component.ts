import { Component, Input, style } from '@angular/core';

@Component({
    selector: 'app-personal-note',
    templateUrl: './user-personal-note.component.html',
    styles: ['.personal-note-line { border-top: 3px solid #5791b9; padding: 25px 0 0 0; }']
})
export class UserPersonalNoteComponent {

    @Input() description: string;

    constructor() { }

}
