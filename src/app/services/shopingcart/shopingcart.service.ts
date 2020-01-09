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

  updateCartItems(updatedItem) {
    let currentCartItems = this.getCartItems();
    for (let i = 0; i < currentCartItems.length; i++) {
      if (currentCartItems[i].id === updatedItem.id) {
        currentCartItems[i] = updatedItem;
      }
    }
    this.cartService.clear();
    for (let i = 0; i < currentCartItems.length; i++) {
      this.cartService.addItem(currentCartItems[i])
    }
    this.dataObs$.next(this.getCartItems())
  }

  removeCartItem(product) {
    let currentCartItems = this.getCartItems();
    for (let i = 0; i < currentCartItems.length; i++) {
      if (currentCartItems[i].id === product._id) {
        currentCartItems.splice(i, 1);
      }
    }
    this.cartService.clear();
    for (let i = 0; i < currentCartItems.length; i++) {
      this.cartService.addItem(currentCartItems[i])
    }
    this.dataObs$.next(this.getCartItems())
  }

  addQuantity(product) {
    let updatedItem = new BaseCartItem({
      id: product._id,
      name: product.name,
      price: product.price,
      quantity: product.quantity + 1})
    this.updateCartItems(updatedItem);
  }

  removeQuantity(product) {
    if (product.quantity > 1) {
      let updatedItem = new BaseCartItem({
        id: product._id,
        name: product.name,
        price: product.price,
        quantity: product.quantity - 1})
      this.updateCartItems(updatedItem);
    } else {
      this.removeCartItem(product)
    }
  }

  async addItem(product) {
    let currentCartItems = this.getCartItems()
    currentCartItems.push(new BaseCartItem({
      id: product._id,
      name: product.name,
      price: product.price,
      quantity: product.quantity + 1,
    }))
    this.cartService.clear();
    for (let i = 0; i < currentCartItems.length; i++) {
      await this.cartService.addItem(currentCartItems[i])
    }
    this.dataObs$.next(this.getCartItems())
  }
}
