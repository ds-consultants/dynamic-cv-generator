import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { User } from '../user';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../core/auth/auth.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {
  experienceForm: FormGroup;
  experiences = {};
  user: User;
  titleOptions = [
    'Junior Front-end Developer',
    'Senior Front-end Developer',
    'Front-end Developer',
    'CQ/AEM Expert',
    'Junior AEM Developer',
    'Senior AEM Developer',
    'AEM Developer',
    'QA Consultant'
  ];
  constructor(private route: ActivatedRoute, private auth: AuthService ) { }

  ngOnInit() {
    this.route.data.subscribe(
      (data: { user: User }) => {
        this.user = data.user;
      }
    );
  }

  onSubmit(f: NgForm) {
    console.log(f.value);
    this.auth.updateUserData(this.user).then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }
}
