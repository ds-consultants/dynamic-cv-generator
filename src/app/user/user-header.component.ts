import { Component, Input, Output, EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-header',
    templateUrl: './user-header.component.html'
})
export class UserHeaderComponent {

    @Input() name: string;
    @Input() title: string;
    @Output() updateUser = new EventEmitter<any>();
    imgUrlFront = '/assets/img/front-end.svg';
    imgUrlTester = '/assets/img/test.svg';
    imgUrlAem = '/assets/img/cq5.svg';
    imgUrlAnalyst = '/assets/img/bussinessAnalyst.svg';
    imgUrlJava = '/assets/img/java.svg';

    titles = [
        { name: 'Junior Front-end Developer', image: this.imgUrlFront },
        { name: 'Senior Front-end Developer', image: this.imgUrlFront },
        { name: 'Front-end Developer', image: this.imgUrlFront },
        { name: 'CQ/AEM Expert', image: this.imgUrlAem },
        { name: 'Junior AEM Developer', image: this.imgUrlAem },
        { name: 'AEM Developer', image: this.imgUrlAem },
        { name: 'Senior AEM Developer', image: this.imgUrlAem },
        { name: 'QA Consultant', image: this.imgUrlAnalyst },
    ];

    titleOptions = this.titles.map(title => {
        return {
            'value': title.name,
            'text': title.name
        };
    });

    getImageIcon() {
        const src = this.titles.find(title => title.name === this.title);
        return src.image;
    }

    saveUser(key, newValue) {
        const params = new Object;
        params[key] = newValue;
        this.updateUser.emit(params);
    }

    constructor() { }

}
