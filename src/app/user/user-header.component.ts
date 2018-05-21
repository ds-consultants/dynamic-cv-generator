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
    titles = [
        'Junior Front-end Developer',
        'Senior Front-end Developer',
        'Front-end Developer',
        'CQ/AEM Expert',
        'Junior AEM Developer',
        'Senior AEM Developer',
        'AEM Developer',
        'QA Consultant'
    ];

    titleOptions = this.titles.map(title => {
        return {
            'value': title,
            'text': title
        };
    });
    saveUser(key, newValue) {
        const params = new Object;
        params[key] = newValue;
        this.updateUser.emit(params);
    }

    constructor() { }

}
