import {AfterContentInit, Directive, ElementRef, HostListener, Input, OnInit, Output} from '@angular/core';
import { NgControl} from '@angular/forms';


@Directive({
  selector:  '[formControl], [formControlName]'
 // selector:  'input:focus)'
//  selector:  '.crSDEValidationInvalid input'
  // selector:  '[formGroup]'
})
export class OnFocusControl implements OnInit {
//export class OnFocusControl {
  constructor(private elementRef:  ElementRef, private ngControl: NgControl) {}
  name: string;

  @HostListener('click')
  onFocusClick(){
   console.log(this.elementRef.nativeElement.id)
  }

  ngOnInit(): void {
  //  console.log(this.elementRef.nativeElement.id)
  }
}
