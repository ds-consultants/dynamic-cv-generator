import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-user-skillset',
    templateUrl: './user-skillset.component.html',
    styles: [`
        ul.no-bullet {
            list-style-type: none;
            padding: 0;
            margin: 0;
        }

        li.second-skill {
            background: url(/assets/img/circle-grey-middle.svg) no-repeat left top;
            background-size: 20px 20px;
            margin: 0 10px 10px 10px;
            padding-left: 30px;
        }

        li.main-skill {
            background: url(/assets/img/circle-maroon-middle.svg) no-repeat left top;
            background-size: 20px 20px;
            margin: 0 10px 10px 10px;
            padding-left: 30px;
        }`]
})
export class UserSkillsetComponent {

    @Input() name: string;
    @Input() skills: Array<{ name: string, main: boolean }>;
    constructor() { }

}
