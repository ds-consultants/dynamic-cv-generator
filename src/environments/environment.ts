// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    firebase: {
      apiKey: 'AIzaSyBCYJggFBKLhloTN7LLfz5ko5ATU4NUKXw',
      authDomain: 'dynamic-cv-generator.firebaseapp.com',
      databaseURL: 'https://dynamic-cv-generator.firebaseio.com',
      projectId: 'dynamic-cv-generator',
      storageBucket: 'dynamic-cv-generator.appspot.com',
      messagingSenderId: '101626907882',
      timestampsInSnapshots: true
    },
    backupAuthKey: '',
    backupEmail: 'backup@example.com',
    backupPassword: ''
};
