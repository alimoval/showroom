import { Injectable } from '@angular/core';
import { Subject, of } from 'rxjs';

@Injectable()
export class ShopingcartService {
  private dataObs$ = new Subject();

  constructor() {
    this.dataObs$.next(JSON.parse(localStorage.getItem('cart')));
   }

  saveCart(cart) {
    this.updateData(cart)
  }

  updateData(data: object) {
    this.dataObs$.next(data);
  }

  getData() {
    return this.dataObs$;
  }
}
