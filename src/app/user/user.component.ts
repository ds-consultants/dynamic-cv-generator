import { Component, Input, OnInit, ViewChild, ComponentFactoryResolver, OnDestroy } from '@angular/core';
import { User } from '../user';

import { ActivatedRoute, Router } from '@angular/router';
import { PdfCompressorService } from '../pdf-compressor.service';

import * as html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf';
import { UserExperienceComponent } from './user-experience.component';
import { forEach } from '@angular/router/src/utils/collection';

import { CVPageOneDirective } from '../cv-page-one.directive';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
    @ViewChild(CVPageOneDirective) cvPageOne: CVPageOneDirective;

    user: User;
    website = 'www.ds-consultants.eu';
    email = 'info@ds-consultants.eu';
    _languages = [];
    _others = [];
    userComponentList = [];

    constructor(
        // private userService: UserService,
        private route: ActivatedRoute,
        private compressor: PdfCompressorService,
        private componentFactoryResolver: ComponentFactoryResolver
    ) { }

    languages(): Array<{ name: string, main: boolean }> {
        this._languages = [];
        if (this.user) {
            for (let index = 0; index < this.user.skillset.languages.main.length; index++) {
                this._languages.push({ name: this.user.skillset.languages.main[index], main: true });
            }
            for (let index = 0; index < this.user.skillset.languages.second.length; index++) {
                this._languages.push({ name: this.user.skillset.languages.second[index], main: false });
            }
            // this._languages.push(...this.user.skillset.languages.main) ;
            // this._languages.push(...this.user.skillset.languages.second);
        }
        return this._languages;
    }

    others(): Array<{ name: string, main: boolean }> {
        this._others = [];
        if (this.user) {
            for (let index = 0; index < this.user.skillset.others.main.length; index++) {
                this._others.push({ name: this.user.skillset.others.main[index], main: true });
            }
            for (let index = 0; index < this.user.skillset.others.second.length; index++) {
                this._others.push({ name: this.user.skillset.others.second[index], main: false });
            }
            // this._others.push(...this.user.skillset.others.main) ;
            // this._others.push(...this.user.skillset.others.second);
        }
        return this._others;
    }
    makeMagick(experience) {
        experience.forEach(exp => {
            const componentFactory = this.componentFactoryResolver.resolveComponentFactory(UserExperienceComponent);

            const viewContainerRef = this.cvPageOne.viewContainerRef;

            const componentRef = viewContainerRef.createComponent(componentFactory);
            (<UserExperienceComponent>componentRef.instance).experience = exp;

            this.userComponentList.push((componentRef));
        });
    }

    ngOnInit() {
        // Retreive the prefetched user
        this.route.data.subscribe(
            (data: { user: User }) => {
                this.user = data.user;
                this.makeMagick(this.user.experience);

                this.languages();
                this.others();
            }
        );
    }

    printCV() {
    }
}
