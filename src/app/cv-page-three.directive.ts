import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[cvPageThree]'
})
export class CVPageThreeDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
