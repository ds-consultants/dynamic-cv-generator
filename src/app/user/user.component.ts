import {
    Component,
    Input,
    OnInit,
    ViewChild,
    ComponentFactoryResolver,
    OnDestroy,
    ElementRef,
    AfterViewInit,
    Renderer2,
    ViewContainerRef
} from '@angular/core';
import { User } from '../user';

import { ActivatedRoute, Router } from '@angular/router';
import { PdfCompressorService } from '../pdf-compressor.service';

import { forEach } from '@angular/router/src/utils/collection';
import * as html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf';

import { UserEducationHeaderComponent } from './user-education-header.component';
import { UserExperienceComponent } from './user-experience.component';
import { UserEducationComponent } from './user-education.component';
import { UserHeaderComponent } from './user-header.component';

import { CVPageOneDirective } from '../cv-page-one.directive';
import { CVPageTwoDirective } from '../cv-page-two.directive';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, AfterViewInit {
    @ViewChild(CVPageOneDirective) cvPageOne: CVPageOneDirective;
    @ViewChild(CVPageTwoDirective) cvPageTwo: CVPageTwoDirective;

    @ViewChild('pageOneContainer') pageOneContainer: ElementRef;
    @ViewChild('cvPageOneContainer') cvPageOneContainer: ElementRef;

    user: User;
    website = 'www.ds-consultants.eu';
    email = 'info@ds-consultants.eu';
    _languages = [];
    _others = [];
    currentPage: ViewContainerRef;

    constructor(
        // private userService: UserService,
        private route: ActivatedRoute,
        private compressor: PdfCompressorService,
        private componentFactoryResolver: ComponentFactoryResolver
    ) {
        // Retreive the prefetched user
        this.route.data.subscribe(
            (data: { user: User }) => {
                this.user = data.user;
                this.languages();
                this.others();
            }
        );
    }

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

    renderUserHeader(name, title) {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(UserHeaderComponent);
        const componentRef = this.currentPage.createComponent(componentFactory);

        (<UserHeaderComponent>componentRef.instance).name = name;
        (<UserHeaderComponent>componentRef.instance).title = title;
    }

    renderExperience(experience) {
        experience.forEach(exp => {
            const componentFactory = this.componentFactoryResolver.resolveComponentFactory(UserExperienceComponent);
            const componentRef = this.currentPage.createComponent(componentFactory);
            (<UserExperienceComponent>componentRef.instance).experience = exp;
        });
    }

    renderEducation(education) {
        const pageHeight = this.cvPageOneContainer.nativeElement.offsetHeight;
        const currentContentHeight = this.pageOneContainer.nativeElement.offsetHeight;
        if (pageHeight - currentContentHeight - 165 < 0) {
            this.currentPage = this.cvPageTwo.viewContainerRef;
        }
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(UserEducationHeaderComponent);
        let componentRef = this.currentPage.createComponent(componentFactory);

        education.forEach(school => {
            if (pageHeight - currentContentHeight - 165 < 0) {
                this.currentPage = this.cvPageTwo.viewContainerRef;
            }
            componentFactory = this.componentFactoryResolver.resolveComponentFactory(UserEducationComponent);
            componentRef = this.currentPage.createComponent(componentFactory);
            (<UserEducationComponent>componentRef.instance).school = school;
        });
    }

    ngOnInit() {
        this.currentPage = this.cvPageOne.viewContainerRef;
        this.renderUserHeader(this.user.name, this.user.title);
        this.renderExperience(this.user.experience);
        // this.renderExperience(this.user.experience);

        setTimeout(() => {
            this.renderEducation(this.user.education);
        }, 100);
    }

    ngAfterViewInit() {

    }

    printCV() {
    }
}
