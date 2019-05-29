import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [
      trigger('showHideToast',
        [
          state('void', style({ top: 0 })),
          state('*', style({ top: 55 })),
          transition('void <=> *', [animate('500ms ease-in-out')])
        ])
    ]
})
export class AppComponent {
    title = 'Dynamic CV generator';

    public static error: string;
    public static info: string;
    public static success: string;
    public static saving: boolean[] = [];
  
    public static showError(text: string, timeout = 8000) {
      this.error = text;
      setTimeout(() => this.error = null, timeout);
    }
  
    public static showInfo(text: string, timeout = 2000) {
      this.info = text;
      setTimeout(() => this.info = null, timeout);
    }

    public static showSuccess(text: string, timeout = 3000) {
        this.success = text;
        setTimeout(() => this.success = null, timeout);
    }

    public static showSavingIndicator() {
        this.saving.push(true);
        setTimeout(() => {
          this.saving.pop();
        }, 1000);    
    }

    get errorText() {
        return AppComponent.error;
    }

    get infoText() {
        return AppComponent.info;
    }

    get successText() {
        return AppComponent.success;
    }

    get isSaving() {
        return AppComponent.saving.length;
    }
}

