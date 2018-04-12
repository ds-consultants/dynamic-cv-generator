import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-personal-note',
  templateUrl: './personal-note.component.html',
  styleUrls: ['./personal-note.component.css']
})
export class PersonalNoteComponent {

  @Input()  description: string;

   constructor() { }

}
