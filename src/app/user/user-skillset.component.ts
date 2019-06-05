import { Component, Input, OnInit } from '@angular/core';

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
            margin: 0 0 7px 5px;
            padding-left: 27px;
        }

        li.main-skill {
            background: url(/assets/img/circle-maroon-middle.svg) no-repeat left top;
            background-size: 20px 20px;
            margin: 0 0 7px 5px;
            padding-left: 27px;
        }
        .skillset-grid {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr;
            grid-column-gap: 15px;
            padding-left: 30px;
        }`]
})
export class UserSkillsetComponent implements OnInit {

    @Input() name: string;
    @Input() skills: { main: Array<any>, second: Array<any>, future: Array<any> };
    mainSkills: Array<any>;
    secondSkills: Array<any>;

    constructor() { }

    splitSkills(skills): Array<any> {
        let splitedSkills;

        const skillsCopy = skills.slice();
        if (skills.length >= 6) {
            const half_length = Math.ceil(skillsCopy.length / 2);

            const leftHalf = skillsCopy.splice(0, half_length);
            splitedSkills = [leftHalf, skillsCopy];
        } else {
            splitedSkills = [skillsCopy];
        }

        return splitedSkills;
    }

    ngOnInit() {
        // Mapping array of skills into array of arrays

        if (this.skills.main.length > this.skills.second.length) {
            this.mainSkills = this.splitSkills(this.skills.main);
            this.secondSkills = [this.skills.second];
        } else {
            this.mainSkills = [this.skills.main];
            this.secondSkills = this.splitSkills(this.skills.second);
        }
    }

}
