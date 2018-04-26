import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[cvPageTwo]'
})
export class CVPageTwoDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
