import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as jsPDF from 'jspdf';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class HtmlToPdfCompressorModule {
  canvasToImage(canvas) {
    const img = new Image();
    const dataURL = canvas.toDataURL('image/png');
    img.src = dataURL;
    return img;
  }

  canvasShiftImage(oldCanvas, shiftAmt) {
    shiftAmt = parseInt(shiftAmt, 10) || 0;
    if (!shiftAmt) { return oldCanvas; }

    const newCanvas = document.createElement('canvas');
    newCanvas.height = oldCanvas.height - shiftAmt;
    newCanvas.width = oldCanvas.width;
    const ctx = newCanvas.getContext('2d');

    const img = this.canvasToImage(oldCanvas);
    ctx.drawImage(img, 0, shiftAmt, img.width, img.height, 0, 0, img.width, img.height);

    return newCanvas;
  }

  compress(canvas): void {
    const pdf = new jsPDF('p', 'px'),
      pdfInternals = pdf.internal,
      pdfPageSize = pdfInternals.pageSize,
      pdfScaleFactor = pdfInternals.scaleFactor,
      pdfPageWidth = pdfPageSize.width,
      pdfPageHeight = pdfPageSize.height,
      htmlPageHeight = canvas.height,
      htmlScaleFactor = canvas.width / (pdfPageWidth * pdfScaleFactor);
    let totalPdfHeight = 0;
    let safetyNet = 0;

    while (totalPdfHeight < htmlPageHeight && safetyNet < 15) {
      const newCanvas = this.canvasShiftImage(canvas, totalPdfHeight);
      pdf.addImage(newCanvas, 'png', 20, 0, pdfPageWidth, 0, null, 'NONE');

      totalPdfHeight += (pdfPageHeight * pdfScaleFactor * htmlScaleFactor);

      if (totalPdfHeight < htmlPageHeight) {
        pdf.addPage();
      }
      safetyNet++;
    }
    return pdf;
  }
}
