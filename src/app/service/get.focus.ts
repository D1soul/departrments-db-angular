import {ElementRef, QueryList} from '@angular/core';

export  function  GetFocus(elementsRef: QueryList<ElementRef>) {
  let elements = [];
  for (let i in elementsRef){
      elements.push(elementsRef)
  }
}
