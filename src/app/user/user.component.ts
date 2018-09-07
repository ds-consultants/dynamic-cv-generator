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
import { CVPageFourDirective } from '../cv-page-four.directive';
import { of } from 'rxjs/observable/of';
import { from } from 'rxjs/observable/from';
import { concatMap, finalize, delay } from 'rxjs/operators';
import { AuthService } from '../core/auth/auth.service';

const pageHeight = 1123;

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
    @ViewChild(CVPageOneDirective) cvPageOne: CVPageOneDirective;
    @ViewChild(CVPageTwoDirective) cvPageTwo: CVPageTwoDirective;
    @ViewChild(CVPageThreeDirective) cvPageThree: CVPageThreeDirective;
    @ViewChild(CVPageFourDirective) cvPageFour: CVPageFourDirective;

    @ViewChild('cvPageOneContainer') pageOneContainer: ElementRef;
    @ViewChild('cvPageTwoContainer') pageTwoContainer: ElementRef;
    @ViewChild('cvPageThreeContainer') pageThreeContainer: ElementRef;
    @ViewChild('cvPageFourContainer') pageFourContainer: ElementRef;

    user: User;
    website = window.localStorage.getItem('dynamicCvWebsite') || 'www.ds-consultants.eu';
    email = window.localStorage.getItem('dynamicCvEmail') || 'info@ds-consultants.eu';
    _languages = [];
    _others = [];
    currentPage: CVPageOneDirective | CVPageTwoDirective | CVPageThreeDirective | CVPageFourDirective;
    currentPageContainer: ElementRef;
    showPageFour: Boolean = false;
    showPageThree: Boolean = false;
    showPageTwo: Boolean = false;
    pdf = new jsPDF('p', 'px');
    contentLoading = true;

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
            }
        );
    }

    saveCurrentUser(data) {
        if (data) {
            const keys = Object.keys(data);
            keys.forEach(key => {
                this.user[key] = data[key];
            });
        }

        this.auth.updateUserData(this.user).then((result) => {
            console.log('User saved');
        }).catch((error) => {
            console.log(error);
        });
    }

    bumpCurrentPage() {
        if (this.currentPage === this.cvPageThree) {
          this.currentPage = this.cvPageFour;
          this.currentPageContainer = this.pageFourContainer;
          this.showPageFour = true;
        } else if (this.currentPage === this.cvPageTwo) {
            this.currentPage = this.cvPageThree;
            this.currentPageContainer = this.pageThreeContainer;
            this.showPageThree = true;
        } else if (this.currentPage === this.cvPageOne) {
            this.currentPage = this.cvPageTwo;
            this.currentPageContainer = this.pageTwoContainer;
            this.showPageTwo = true;
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
        const source = from(experience);
        source.pipe(
          concatMap(res =>  of(res) ),
          delay(200),
          finalize(() => this.renderEducation(this.user.education) )
        ).subscribe(val => {
          const lastExperience = index === experience.length - 1;
          this.renderSingleExperienceRow(val, lastExperience);
          this.ensureLastComponentFitPage();
          index++;
        });
    }

    renderSingleExperienceRow(exp, lastExperience) {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(UserExperienceComponent);
        const componentRef = this.currentPage.viewContainerRef.createComponent(componentFactory);
        (<UserExperienceComponent>componentRef.instance).experience = exp;
        (<UserExperienceComponent>componentRef.instance).lastExperience = lastExperience;
        (<UserExperienceComponent>componentRef.instance).updateUser.subscribe(data => this.saveCurrentUser(data));
    }

    renderEducation(education) {
        setTimeout(() => {
            let currentContentHeight = this.currentPageContainer.nativeElement.clientHeight;
            if (pageHeight - currentContentHeight - 248 < 0) {
                this.bumpCurrentPage();
            }
            const componentFactory = this.componentFactoryResolver.resolveComponentFactory(UserEducationHeaderComponent);
            const componentRef = this.currentPage.viewContainerRef.createComponent(componentFactory);

            education.forEach((school, index) => {
                currentContentHeight = this.currentPageContainer.nativeElement.clientHeight;
                if (pageHeight - currentContentHeight - 60 < 0) {
                    this.bumpCurrentPage();
                }
                const factory = this.componentFactoryResolver.resolveComponentFactory(UserEducationComponent);
                const ref = this.currentPage.viewContainerRef.createComponent(factory);
                (<UserEducationComponent>ref.instance).school = school;
                (<UserEducationComponent>ref.instance).updateUser.subscribe(data => this.saveCurrentUser(data));
                if ((education.length - 1) === index) {
                    (<UserEducationComponent>ref.instance).lastRow = true;
                }
            });

            setTimeout(() => {
                this.renderProfessionalExpectations(this.user.professionalExpectations, this.user.personalNote);
            }, 3000);
        }, 0);
    }

    renderProfessionalExpectations(expectations, note) {
        setTimeout(() => {
            const currentContentHeight = this.currentPageContainer.nativeElement.clientHeight;
            if (pageHeight - currentContentHeight - 180 < 0) {
                this.bumpCurrentPage();
            }
            const componentFactory = this.componentFactoryResolver.resolveComponentFactory(UserProfExpectationsComponent);
            const componentRef = this.currentPage.viewContainerRef.createComponent(componentFactory);
            (<UserProfExpectationsComponent>componentRef.instance).proffesionalExpectations = expectations;
            (<UserProfExpectationsComponent>componentRef.instance).personalNote = note;
            (<UserProfExpectationsComponent>componentRef.instance).updateUser.subscribe(data => this.saveCurrentUser(data));
            setTimeout(() => {
                this.renderSkills(this.user.skillset);
            }, 3000);
        }, 0);
    }

    renderSkills(skillset) {
        setTimeout(() => {
            const skillsetNames = Object.keys(skillset);
            // 280 = skillset header + first row of skills(max 3 main skills)
            // 60 = bottom padding
            if (pageHeight - this.currentPageContainer.nativeElement.clientHeight - 280 - 60 < 0) {
                this.bumpCurrentPage();
            }

            const componentFactory = this.componentFactoryResolver.resolveComponentFactory(UserSkillsHeaderComponent);
            const componentRef = this.currentPage.viewContainerRef.createComponent(componentFactory);
            // UserSkillsetComponent
            from(skillsetNames)
            .pipe(
              concatMap(res =>  of(res).pipe(delay(500))),
              finalize(() => {
                this.ensureLastComponentFitPage(true);
                this.renderFooter();
                this.contentLoading = false;
              })
            ).subscribe(val => {
              const name = val;
              this.renderSingleSkillRow(name, skillset[name]);
              if (val !== skillsetNames[skillsetNames.length - 1]) {
                this.ensureLastComponentFitPage(false);
              }
            });
        }, 0);
    }

    renderSingleSkillRow(skillName, skills) {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(UserSkillsetComponent);
        const componentRef = this.currentPage.viewContainerRef.createComponent(componentFactory);
        (<UserSkillsetComponent>componentRef.instance).name = skillName;
        (<UserSkillsetComponent>componentRef.instance).skills = skills;

    }

    renderFooter() {
        setTimeout(() => {
            const componentFactory = this.componentFactoryResolver.resolveComponentFactory(UserFooterComponent);
            const componentRef = this.currentPage.viewContainerRef.createComponent(componentFactory);
            (<UserFooterComponent>componentRef.instance).email = this.email;
            (<UserFooterComponent>componentRef.instance).website = this.website;
        }, 0);
    }

    ensureLastComponentFitPage(fitFooterComponent?: Boolean) {
        setTimeout(() => {
            const addPage = () => {
              const detachedView = this.currentPage.viewContainerRef.detach();
              this.bumpCurrentPage();
              this.currentPage.viewContainerRef.insert(detachedView);
            };

            if (fitFooterComponent) {
              if (pageHeight - this.currentPageContainer.nativeElement.clientHeight + 92 < 0) {
                addPage();
              }
            } else {
              if (pageHeight - this.currentPageContainer.nativeElement.clientHeight - 20 < 0) {
                addPage();
              }
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
