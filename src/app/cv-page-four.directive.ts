import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[cvPageFour]'
})
export class CVPageFourDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
