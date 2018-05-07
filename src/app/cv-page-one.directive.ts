import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[cvPageOne]'
})
export class CVPageOneDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
