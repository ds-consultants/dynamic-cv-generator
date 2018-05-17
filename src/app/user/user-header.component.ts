import { Component, Input, OnInit } from '@angular/core';
import { User } from '../user';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../core/auth/auth.service';
@Component({
    selector: 'app-header',
    templateUrl: './user-header.component.html'
})
export class UserHeaderComponent implements OnInit {

    user: User;
    imgUrl = "";
    imgUrlFront = "/assets/img/front-end.svg";
    imgUrlTester = "/assets/img/test.svg";
    imgUrlAem = "/assets/img/cq5.svg";
    imgUrlAnalyst = "/assets/img/bussinessAnalyst.svg";
    imgUrlJava = "/assets/img/java.svg";
    // imgUrl = this.user.photoURL;
    @Input() name: string;
    @Input() title: string;

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
          this.compareUrl();
        }

        compareUrl(){
            if(this.user.photoURL == 'Frontend'){
                this.imgUrl = this.imgUrlFront;
            }
            if(this.user.photoURL == 'Tester'){
                this.imgUrl = this.imgUrlTester;
            }
            if(this.user.photoURL == 'Java'){
                this.imgUrl = this.imgUrlJava;
            }
            if(this.user.photoURL == 'AEM'){
                this.imgUrl = this.imgUrlAem;
            }
            if(this.user.photoURL == 'Analyst'){
                this.imgUrl = this.imgUrlAnalyst;
            }
            return this.imgUrl;
        }

}
