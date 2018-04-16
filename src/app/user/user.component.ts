import { Component, OnInit } from '@angular/core';
import { User } from '../user';

import { ActivatedRoute, Router } from '@angular/router';
import { PdfCompressorService } from '../pdf-compressor.service';

import * as html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: User;
  website = 'www.ds-consultants.eu';
  email = 'info@ds-consultants.eu';

  constructor(
    private route: ActivatedRoute,
    private compressor: PdfCompressorService
  ) { }

  ngOnInit() {

    // Retreive the prefetched user
    this.route.data.subscribe(
      (data: { user: User }) => {
        this.user = data.user;
      }
    );
  }

  printCV() {
    html2canvas(document.getElementById('cv-page-1')).then((canvasPage1) => {
      html2canvas(document.getElementById('cv-page-2')).then((canvasPage2) => {
        const pdf = new jsPDF('p', 'px');
        this.compressor.compress(canvasPage1, pdf);
        this.compressor.compress(canvasPage2, pdf);
        pdf.save('download.pdf');
      });
    });
  }
}
