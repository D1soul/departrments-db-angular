import {AfterContentInit, Directive, ElementRef, HostListener, Input, OnInit, Output} from '@angular/core';
import { NgControl} from '@angular/forms';


@Directive({
  selector:  '[formControl, [formControlName]'
})
export class OnFocusControl implements OnInit, AfterContentInit {
  constructor( private elementRef:  ElementRef, private ngControl: NgControl ) {}
  nameFocus: string = '';
  get elements(){

    return this.elementRef;
  }


  ngOnInit(): void {
  //  console.log(this.elementRef.nativeElement.id)
  }
  ngAfterContentInit(): void {
  }




}
