import { Component, Input } from '@angular/core';
import { User } from '../user'; 
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../core/auth/auth.service';

@Component({
    selector: 'app-prof-expectations',
    templateUrl: './user-prof-expectations.component.html'
})
export class UserProfExpectationsComponent {

    @Input() proffesionalExpectations: string;
    @Input() personalNote: string;
    user: User;
    personalExpectationNote = "Profesional Expectations & Personal Note";

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
