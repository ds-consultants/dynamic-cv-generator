import { Component } from '@angular/core';

@Component({
    selector: 'app-user-education-header',
    template: `
        <div class="row">
            <div class="col-sm-4">
                <i class="education-icon"></i>
                <h2><inline-editor type="textarea" [(ngModel)]="eudcationTitle"> </inline-editor></h2> 	
            </div>
            <div class="col-sm-8 draw-line-no-margin"> 
            </div>
        </div>`
})
export class UserEducationHeaderComponent {

  
    
    constructor() { }
    eudcationTitle = "EDUCATION";
}
