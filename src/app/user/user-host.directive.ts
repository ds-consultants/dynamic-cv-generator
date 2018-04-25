import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appUserHost]'
})
export class UserHostDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
