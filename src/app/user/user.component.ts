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
import { UserSkillsHeaderComponent } from './user-skills-header.component';
import { UserExperienceComponent } from './user-experience.component';
import { UserEducationComponent } from './user-education.component';
import { UserSkillsetComponent } from './user-skillset.component';
import { UserHeaderComponent } from './user-header.component';
import { UserFooterComponent } from './user-footer.component';

import { CVPageOneDirective } from '../cv-page-one.directive';
import { CVPageTwoDirective } from '../cv-page-two.directive';
import { CVPageThreeDirective } from '../cv-page-three.directive';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/takeWhile';
import { AuthService } from '../core/auth/auth.service';

const pageHeight = 1123;

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {
    @ViewChild(CVPageOneDirective) cvPageOne: CVPageOneDirective;
    @ViewChild(CVPageTwoDirective) cvPageTwo: CVPageTwoDirective;
    @ViewChild(CVPageThreeDirective) cvPageThree: CVPageThreeDirective;

    @ViewChild('cvPageOneContainer') pageOneContainer: ElementRef;
    @ViewChild('cvPageTwoContainer') pageTwoContainer: ElementRef;
    @ViewChild('cvPageThreeContainer') pageThreeContainer: ElementRef;

    user: User;
    website = window.localStorage.getItem('dynamicCvWebsite') || 'www.ds-consultants.eu';
    email = window.localStorage.getItem('dynamicCvEmail') || 'info@ds-consultants.eu';
    _languages = [];
    _others = [];
    currentPage: CVPageOneDirective | CVPageTwoDirective | CVPageThreeDirective;
    currentPageContainer: ElementRef;
    showPageThree: Boolean = true;
    pdf = new jsPDF('p', 'px');

    constructor(
        // private userService: UserService,
        private route: ActivatedRoute,
        private compressor: PdfCompressorService,
        private auth: AuthService,
        private componentFactoryResolver: ComponentFactoryResolver
    ) {
        // Retreive the prefetched user
        this.route.data.subscribe(
            (data: { user: User }) => {
                this.user = data.user;
                this.showPageThree = false;
            }
        );
    }

    saveCurrentUser(data) {
        const keys = Object.keys(data);
        keys.forEach(key => {
            this.user[key] = data[key];
        });

        this.auth.updateUserData(this.user).then((result) => {
            console.log('User saved');
        }).catch((error) => {
            console.log(error);
        });
    }

    bumpCurrentPage() {
        if (this.currentPage === this.cvPageTwo) {
            this.currentPage = this.cvPageThree;
            this.currentPageContainer = this.pageThreeContainer;
            this.showPageThree = true;
        } else if (this.currentPage === this.cvPageOne) {
            this.currentPage = this.cvPageTwo;
            this.currentPageContainer = this.pageTwoContainer;
        }
    }

    renderUserHeader(name, title) {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(UserHeaderComponent);
        const componentRef = this.currentPage.viewContainerRef.createComponent(componentFactory);

        (<UserHeaderComponent>componentRef.instance).name = name;
        (<UserHeaderComponent>componentRef.instance).title = title;
        (<UserHeaderComponent>componentRef.instance).updateUser.subscribe(data => this.saveCurrentUser(data));
    }

    renderExperience(experience) {
        let index = 0;
        Observable.interval(100)
            .takeWhile(() => index !== experience.length)
            .subscribe(i => {
                const lastExperience = index === experience.length - 1;
                this.renderSingleExperienceRow(experience[index], lastExperience);
                this.ensureLastComponentFitPage();
                index++;

                if (index === experience.length) {
                    this.renderEducation(this.user.education);
                }
            });
    }

    renderSingleExperienceRow(exp, lastExperience) {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(UserExperienceComponent);
        const componentRef = this.currentPage.viewContainerRef.createComponent(componentFactory);
        (<UserExperienceComponent>componentRef.instance).experience = exp;
        (<UserExperienceComponent>componentRef.instance).lastExperience = lastExperience;
    }

    renderEducation(education) {
        let currentContentHeight = this.currentPageContainer.nativeElement.clientHeight;
        if (pageHeight - currentContentHeight - 248 < 0) {
            this.bumpCurrentPage();
        }
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(UserEducationHeaderComponent);
        let componentRef = this.currentPage.viewContainerRef.createComponent(componentFactory);

        education.forEach((school, index) => {
            currentContentHeight = this.currentPageContainer.nativeElement.clientHeight;
            if (pageHeight - currentContentHeight - 60 < 0) {
                this.bumpCurrentPage();
            }
            componentFactory = this.componentFactoryResolver.resolveComponentFactory(UserEducationComponent);
            componentRef = this.currentPage.viewContainerRef.createComponent(componentFactory);
            (<UserEducationComponent>componentRef.instance).school = school;
            if ((education.length - 1) === index) {
                (<UserEducationComponent>componentRef.instance).lastRow = true;
            }
        });

        setTimeout(() => {
            this.renderProfessionalExpectations(this.user.professionalExpectations, this.user.personalNote);
        }, 3000);
    }

    renderProfessionalExpectations(expectations, note) {
        const currentContentHeight = this.currentPageContainer.nativeElement.clientHeight;
        if (pageHeight - currentContentHeight - 180 < 0) {
            this.bumpCurrentPage();
        }
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(UserProfExpectationsComponent);
        const componentRef = this.currentPage.viewContainerRef.createComponent(componentFactory);
        (<UserProfExpectationsComponent>componentRef.instance).proffesionalExpectations = expectations;
        (<UserProfExpectationsComponent>componentRef.instance).personalNote = note;

        setTimeout(() => {
            this.renderSkills(this.user.skillset);
        }, 3000);
    }

    renderSkills(skillset) {
        const skillsetNames = Object.keys(skillset);
        // 280 = skillset header + first row of skills(max 3 main skills)
        // 60 = bottom padding
        if (pageHeight - this.currentPageContainer.nativeElement.clientHeight - 280 - 60 < 0) {
            this.bumpCurrentPage();
        }

        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(UserSkillsHeaderComponent);
        const componentRef = this.currentPage.viewContainerRef.createComponent(componentFactory);
        // UserSkillsetComponent
        let index = 0;
        Observable.interval(100)
            .takeWhile(() => {
                if (index !== skillsetNames.length) {
                    return true;
                } else {
                    this.renderFooter();
                    return false;
                }
            })
            .subscribe(i => {
                const name = skillsetNames[index];
                this.renderSingleSkillRow(name, skillset[name]);
                this.ensureLastComponentFitPage();
                index++;
            });

    }

    renderSingleSkillRow(skillName, skills) {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(UserSkillsetComponent);
        const componentRef = this.currentPage.viewContainerRef.createComponent(componentFactory);
        (<UserSkillsetComponent>componentRef.instance).name = skillName;
        (<UserSkillsetComponent>componentRef.instance).skills = skills;

    }

    renderFooter() {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(UserFooterComponent);
        const componentRef = this.currentPage.viewContainerRef.createComponent(componentFactory);
        (<UserFooterComponent>componentRef.instance).email = this.email;
        (<UserFooterComponent>componentRef.instance).website = this.website;
    }

    ensureLastComponentFitPage() {
        setTimeout(() => {
            if (pageHeight - this.currentPageContainer.nativeElement.clientHeight - 20 < 0) {
                const detachedView = this.currentPage.viewContainerRef.detach();
                this.bumpCurrentPage();
                this.currentPage.viewContainerRef.insert(detachedView);
            }
        }, 100);
    }

    ngOnInit() {
        this.currentPage = this.cvPageOne;
        this.currentPageContainer = this.pageOneContainer;
        this.renderUserHeader(this.user.name, this.user.title);
        this.renderExperience(this.user.experience);
    }

    printCV() {
        window.print();
    }
}
