import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appElementDirective]'
})
export class ElementDirectiveDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
