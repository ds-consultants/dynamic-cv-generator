import { Component, OnInit } from '@angular/core';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-cvpreview',
  templateUrl: './cvpreview.component.html',
  styleUrls: ['./cvpreview.component.css']
})
export class CvpreviewComponent implements OnInit {
  name: string;
  private sub: any;
  private selectedUser: User;

  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.name = params['name'];
      // get user data
     this.userService.getUser(this.name).subscribe( user => {
        this.selectedUser = user[0];
     });
    //  this.selectedUser = new User();
    //  this.selectedUser.name = 'Dawid Kozak';
    //  this.selectedUser.title = 'SENIOR FRONT-END DEVELOPER';

    });
  }

  printCV() {
    html2canvas(document.getElementById('cv')).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG', 0, 0);
        pdf.save('download.pdf');
    });
  }
}
