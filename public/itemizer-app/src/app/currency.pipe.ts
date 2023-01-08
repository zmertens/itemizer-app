import { Pipe, PipeTransform } from '@angular/core';

import { CURRENCIES } from './items/CURRENCIES';

@Pipe({
  name: 'currency'
})
export class CurrencyPipe implements PipeTransform {


  transform(value: string): string {
    const YEN = '\u00A5';
    const EURO = '\u20A0';
    const PESO = '\u20B1';

    for (let currency of CURRENCIES) {
      // console.log(`currency: ${currency}`);
      if (value === currency) {
        if (value === 'Yen') {
          return YEN;
        } else if (value === 'US Dollar') {
          return '$';
        } else if (value === 'Euro') {
          return EURO;
        } else if (value === 'Peso') {
          return PESO;
        }
      }
    }
  }

}
