import { Component, Input, style } from '@angular/core';

@Component({
    selector: 'app-personal-note',
    templateUrl: './user-personal-note.component.html',
    styles: [`
        .personal-note-line {
            border-top: 3px solid #5791b9;
            padding-top: 25px;
            margin-top: 80px;
        }`]
})
export class UserPersonalNoteComponent {

    @Input() description: string;

    constructor() { }

}
