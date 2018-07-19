# DynamicCvGenerator

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.3.

# Dependencies

* Node 9.10.1
* NPM 5.6.0
* Angular 6.0.7
* Angular CLI 6.0.8


# Setting up and starting the server

* Run `npm install`.
* Copy `src/environments/environment.ts` to `src/environments/environment.dev.ts` and populate environment variables.
* Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

# Firebase hosting

Install `firebase-tools` with npm: `npm i -g firebase-tools`

## Doployment

* Make sure you have access to both `test` and `production` firebase environments
* Add firebase production environment localy: `firebase use --add` with alias `default`
* Add firebase test environment localy: `firebase use --add` with alias `test`
* Make sure you have `src/environments/environment.test.ts` and `src/environments/environment.prod.ts` files properly populated
* Run `bin/deploy.all.sh` to deploy to both environments
* Run `bin/deploy.test.sh` to deploy to `test` environment
* Run `bin/deploy.production.sh` to deploy to `production` environment

## Working with firebase functions

* Modify and add new firebase functions to `functions/src/index.ts`
* Work with firebase library [Documentation](https://firebase.google.com/docs/firestore/quickstart)
* Deploy functions with `firebase deploy --only functions`

# Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
