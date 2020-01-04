import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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

  getCartItems() {
    return this.cartService.getItems();
  }
}
