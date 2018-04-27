import {
    Component,
    Input,
    OnInit,
    ViewChild,
    ComponentFactoryResolver,
    OnDestroy,
    ElementRef,
    ViewContainerRef
} from '@angular/core';
import { User } from '../user';

import { ActivatedRoute, Router } from '@angular/router';
import { PdfCompressorService } from '../pdf-compressor.service';

import { forEach } from '@angular/router/src/utils/collection';
import * as html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf';

import { UserProfExpectationsComponent } from './user-prof-expectations.component';
import { UserEducationHeaderComponent } from './user-education-header.component';
import { UserExperienceComponent } from './user-experience.component';
import { UserEducationComponent } from './user-education.component';
import { UserHeaderComponent } from './user-header.component';
import { UserFooterComponent } from './user-footer.component';

import { CVPageOneDirective } from '../cv-page-one.directive';
import { CVPageTwoDirective } from '../cv-page-two.directive';
import { CVPageThreeDirective } from '../cv-page-three.directive';

const pageHeight = 1223;

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
    @ViewChild(CVPageOneDirective) cvPageOne: CVPageOneDirective;
    @ViewChild(CVPageTwoDirective) cvPageTwo: CVPageTwoDirective;
    @ViewChild(CVPageThreeDirective) cvPageThree: CVPageThreeDirective;

    @ViewChild('cvPageOneContainer') pageOneContainer: ElementRef;
    @ViewChild('cvPageTwoContainer') pageTwoContainer: ElementRef;
    @ViewChild('cvPageThreeContainer') pageThreeContainer: ElementRef;

    user: User;
    website = 'www.ds-consultants.eu';
    email = 'info@ds-consultants.eu';
    _languages = [];
    _others = [];
    currentPage: CVPageOneDirective | CVPageTwoDirective | CVPageThreeDirective;
    currentPageContainer: ElementRef;
    showPageThree: Boolean = false;

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

    bumpCurrentPage() {
        if (this.currentPage === this.cvPageTwo) {
            this.currentPage = this.cvPageThree;
            this.currentPageContainer = this.pageThreeContainer;
            this.showPageThree = true;
        } else {
            this.currentPage = this.cvPageTwo;
            this.currentPageContainer = this.pageTwoContainer;
        }
    }

    renderUserHeader(name, title) {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(UserHeaderComponent);
        const componentRef = this.currentPage.viewContainerRef.createComponent(componentFactory);

        (<UserHeaderComponent>componentRef.instance).name = name;
        (<UserHeaderComponent>componentRef.instance).title = title;
    }

    renderExperience(experience) {
        experience.forEach(exp => {
            const componentFactory = this.componentFactoryResolver.resolveComponentFactory(UserExperienceComponent);
            const componentRef = this.currentPage.viewContainerRef.createComponent(componentFactory);
            (<UserExperienceComponent>componentRef.instance).experience = exp;
        });
    }

    renderEducation(education) {
        let currentContentHeight = this.currentPageContainer.nativeElement.offsetHeight;
        if (pageHeight - currentContentHeight - 165 < 0) {
            this.bumpCurrentPage();
        }
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(UserEducationHeaderComponent);
        let componentRef = this.currentPage.viewContainerRef.createComponent(componentFactory);

        education.forEach(school => {
            currentContentHeight = this.currentPageContainer.nativeElement.offsetHeight;

            if (pageHeight - currentContentHeight - 165 < 0) {
                this.bumpCurrentPage();
            }
            componentFactory = this.componentFactoryResolver.resolveComponentFactory(UserEducationComponent);
            componentRef = this.currentPage.viewContainerRef.createComponent(componentFactory);
            (<UserEducationComponent>componentRef.instance).school = school;
        });
    }

    renderProfessionalExpectations(expectations) {
        const currentContentHeight = this.currentPageContainer.nativeElement.offsetHeight;
        if (pageHeight - currentContentHeight - 180 < 0) {
            this.bumpCurrentPage();
        }
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(UserProfExpectationsComponent);
        const componentRef = this.currentPage.viewContainerRef.createComponent(componentFactory);
        (<UserProfExpectationsComponent>componentRef.instance).description = expectations;
    }

    renderFooter(website, email) {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(UserFooterComponent);
        const componentRef = this.currentPage.viewContainerRef.createComponent(componentFactory);
        (<UserFooterComponent>componentRef.instance).email = this.email;
        (<UserFooterComponent>componentRef.instance).website = this.website;
    }

    ngOnInit() {
        this.currentPage = this.cvPageOne;
        this.currentPageContainer = this.pageOneContainer;
        this.renderUserHeader(this.user.name, this.user.title);
        this.renderExperience(this.user.experience);
        this.renderExperience(this.user.experience);

        setTimeout(() => {
            this.renderEducation(this.user.education);
            this.renderProfessionalExpectations(this.user.professionalExpectations);
            this.renderFooter(this.website, this.email);
        }, 100);
    }

    printCV() {
    }
}
