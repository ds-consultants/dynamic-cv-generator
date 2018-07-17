import { fakeAsync } from '@angular/core/testing';
import { UserSettingsComponent } from './user-settings.component';
import { ActivatedRoute, Router } from '@angular/router';

describe('UserSettingsComponent', () => {
  function setup() {
    const authSpy = jasmine.createSpyObj('AuthService', ['updateUserData']);
    authSpy.updateUserData.and.returnValue(new Promise(() => {}));

    spyOn(window, 'confirm').and.returnValue(true);

    const fakeUser = {
      name: 'John',
      title: 'QA Consultant',
      experience: [],
      education: [],
      skillset: {},
      professionalExpectations: '',
      personalNote: '',
      uid: '',
      email: '',
      superUser: false
    };

    const experience = {
      company: 'Google',
      position: 'dev',
      projects: [],
      time: '2017-2018',
      mainProjects: []
    };

    const education = {
      name: 'High school',
      place: 'MIT',
      time: '2010-2018',
      namePlace: ''
    };

    const userSettingsComponent = new UserSettingsComponent(null, authSpy, null);
    userSettingsComponent.user = fakeUser;

    return {userSettingsComponent, experience, education};
  }

  it('should response with true for no user experience check', fakeAsync(() => {
    const { userSettingsComponent } = setup();
    userSettingsComponent.checkNewHireExperienceButtonState();

    expect(userSettingsComponent.showNewHireExperienceButton)
      .toBe(true);
  })) ;

  it('should allow to add and delete eduction for user', () => {
    const { userSettingsComponent, experience, education } = setup();

    userSettingsComponent.education = { ...education };

    expect(userSettingsComponent.user.education)
      .toEqual([]);

    userSettingsComponent.addEducation();

    expect(userSettingsComponent.user.education)
      .toEqual([education]);

    userSettingsComponent.deleteEducation(education);

    expect(userSettingsComponent.user.education)
      .toEqual([]);
  });

  it('should add experience for user', () => {
    const { userSettingsComponent, experience } = setup();

    userSettingsComponent.experience = { ...experience };

    expect(userSettingsComponent.user.experience)
      .toEqual([]);

    userSettingsComponent.addExperience();

    expect(userSettingsComponent.user.experience)
      .toEqual([experience]);
  });

  it('should add new hire experience for user', () => {
    const { userSettingsComponent } = setup();
    const currentDate = new Date();
    const currentDateMonthString = currentDate.toLocaleString('en-us', { month: 'long' });

    expect(userSettingsComponent.user.experience)
      .toEqual([]);

    userSettingsComponent.addNewHireExperience();

    expect(userSettingsComponent.user.experience)
      .toEqual([{
        company: 'Dynamic Solutions',
        position: 'QA Consultant',
        time:  currentDate.getFullYear() + '-present',
        mainProjects: [
          { desc: `New hire. Start ${currentDateMonthString}, 1st` }
        ]
      }]);
  });

  it('should toggle skillset form visibility', () => {
    const { userSettingsComponent } = setup();
    expect(userSettingsComponent.showSkillsetForm)
      .toEqual(false, 'at the beginning');

    userSettingsComponent.toggleSkillsetForm();

    expect(userSettingsComponent.showSkillsetForm)
    .toEqual(true, 'after button click');
  });

  it('should allow to add main project for user', () => {
    const { userSettingsComponent, experience } = setup();

    userSettingsComponent.experience = { ...experience };
    userSettingsComponent.addExperience();

    userSettingsComponent.mainProject.desc = 'Some main project desc';
    userSettingsComponent.mainProject.technologies = '';

    userSettingsComponent.addMainProject();

    expect(userSettingsComponent.user.experience[0])
      .toEqual({ ...experience, mainProjects: [
        {desc: 'Some main project desc', technologies: []}
      ]});
  });

  it('should allow to add project for user', () => {
    const { userSettingsComponent, experience } = setup();

    userSettingsComponent.experience = { ...experience };
    userSettingsComponent.addExperience();

    userSettingsComponent.project.name = 'project_one';
    userSettingsComponent.project.title = 'Project One';
    userSettingsComponent.project.desc = 'Some side project desc';
    userSettingsComponent.project.technologies = '';

    userSettingsComponent.addProject();

    expect(userSettingsComponent.user.experience[0])
      .toEqual({ ...experience, projects: [
        {
          desc: 'Some side project desc',
          title: 'Project One',
          name: 'project_one',
          technologies: []}
      ]});
  });
});
