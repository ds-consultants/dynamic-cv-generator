import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {
  experienceForm: FormGroup;
  constructor() { }

  ngOnInit() {
   this.initForm();
  }

  onAddExperience() {
    (<FormArray>this.experienceForm.get('experiences')).push(
      new FormGroup({
        'company': new FormControl(null, Validators.required),
        'from': new FormControl(null, Validators.required),
        'description': new FormControl(null, Validators.required)
      })
    );
  }

  private initForm() {
    let company = 'moje';
    let from = '2018-05';
    let desc = 'bardzo długi opis';
    let experiences = new FormArray([]);

    experiences.push( new FormGroup({
      'company': new FormControl(company, Validators.required),
      'from': new FormControl(from, Validators.required),
      'description': new FormControl(desc, Validators.required)
    }));

    this.experienceForm = new FormGroup({
      'name': new FormControl('wart', Validators.required),
      'experiences': experiences
    });
  }
}
