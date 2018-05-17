import { Component, Input, OnInit } from '@angular/core';
import { User } from '../user'; 
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../core/auth/auth.service';
@Component({
    selector: 'app-user-experience',
    templateUrl: './user-experience.component.html'
})
export class UserExperienceComponent implements OnInit{

    @Input() experience: any;
    @Input() lastExperience: Boolean | false;
    user: User;
    
    constructor(
        private route: ActivatedRoute,
        private auth: AuthService,
        private router: Router
    ) {}

     ngOnInit(){
        
        this.route.data.subscribe(
            (data: { user: User }) => {
              this.user = data.user;
              console.log(this.user.photoURL);
            }
          );
 
        }
}
