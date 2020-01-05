import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';

import { CartService, BaseCartItem } from 'ng-shopping-cart';

@Injectable()
export class ShoppingcartService {
  private dataObs$ = new BehaviorSubject(this.getCartItems());

  constructor(
    private cartService: CartService<BaseCartItem>,
  ) { }

  getData() {
    return this.dataObs$;
  }

  getSumm() {
    let summ = 0;
    const items = this.getCartItems();
    for (let i = 0; i < items.length; i++) {
      summ += items[i].price * items[i].quantity;
    }
    return of(summ);
  }

  getCartItems() {
    return this.cartService.getItems();
  }
}
