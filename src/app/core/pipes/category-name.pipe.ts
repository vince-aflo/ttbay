import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryName'
})

export class CategoryNamePipe implements PipeTransform {

  transform(value: string): string {
    let sentence = value.toLowerCase().split("_");
    for(let i = 0; i< sentence.length; i++){
        sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
    }
   return sentence.join(" ")
  }

}
