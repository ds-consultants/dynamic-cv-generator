import { Component, Input, EventEmitter, Output } from '@angular/core';
import { User } from '../user'; 
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../core/auth/auth.service';
@Component({
    selector: 'app-user-education',
    templateUrl: './user-education.component.html',
    styles: ['.btnremove { float: right; }']
})
export class UserEducationComponent {

    @Input() school: Array<number>;
    @Input() lastRow = false;
    @Input() edit: boolean;
    @Input() id: number;
    @Output() delete: EventEmitter<any> = new EventEmitter();
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

    removeElement() {
        // add remove action
        this.delete.emit(this.id);
    }
}
