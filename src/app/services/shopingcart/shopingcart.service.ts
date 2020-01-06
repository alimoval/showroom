import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';

import { CartService, BaseCartItem } from 'ng-shopping-cart';

@Injectable()
export class ShoppingcartService {
  private dataObs$ = new BehaviorSubject(this.getCartItems());

  constructor(
    private cartService: CartService<BaseCartItem>,
  ) { 
    console.log('cart initial', this.cartService.getItems())
  }

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

  addQuantity(cartItem) {
    let updatedItem = new BaseCartItem({...cartItem, quantity: cartItem.quantity + 1})
    this.updateCartItems(updatedItem);
  }

  removeQuantity(cartItem) {
    if (cartItem.quantity > 0) {
      let updatedItem = {...cartItem, quantity: cartItem.quantity - 1}
      this.updateCartItems(updatedItem);
    }
  }

  async addItem(product) {
    let currentCartItems = this.getCartItems()
    currentCartItems.push(new BaseCartItem({
      id: product._id,
      name: product.name,
      price: product.price,
      img: product.img,
      category: product.category,
    }))
    this.cartService.clear();
    for (let i = 0; i < currentCartItems.length; i++) {
      await this.cartService.addItem(currentCartItems[i])
    }
    this.dataObs$.next(this.getCartItems())
  }
}
