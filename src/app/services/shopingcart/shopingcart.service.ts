import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs';

import { CartService, BaseCartItem } from 'ng-shopping-cart';
import { environment } from '../../../environments/environment'
import { catchError } from 'rxjs/operators';

@Injectable()
export class ShoppingcartService {
  private dataObs$ = new BehaviorSubject(this.getCartItems());
  public base: string;

  constructor(
    private cartService: CartService<BaseCartItem>,
    private http: HttpClient,
  ) { 
    this.base = environment.serverConfig.host + environment.serverConfig.port
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

  removeCartItem(product) {
    let currentCartItems = this.getCartItems();
    for (let i = 0; i < currentCartItems.length; i++) {
      if (currentCartItems[i].id === product._id || currentCartItems[i].id === product.id) {
        currentCartItems.splice(i, 1);
      }
    }
    this.cartService.clear();
    for (let i = 0; i < currentCartItems.length; i++) {
      this.cartService.addItem(currentCartItems[i])
    }
    this.dataObs$.next(this.getCartItems())
  }

  removeCartItems() {
    this.cartService.clear();
    this.dataObs$.next(this.getCartItems())
  }

  removeQuantity(product) {
    if (product.quantity > 1) {
      let updatedItem = new BaseCartItem({
        id: product._id || product.id,
        name: product.name,
        price: product.price,
        quantity: product.quantity - 1,
        image: product.img || product.image,
      })
      this.updateCartItems(updatedItem);
    } else {
      this.removeCartItem(product)
    }
  }

  addQuantity(product) {
    let updatedItem = new BaseCartItem({
      id: product._id || product.id,
      name: product.name,
      price: product.price,
      quantity: product.quantity + 1,
      image: product.img || product.image,
    })
    this.updateCartItems(updatedItem);
  }

  async addItem(product) {
    let currentCartItems = this.getCartItems()
    currentCartItems.push(new BaseCartItem({
      id: product._id,
      name: product.name,
      price: product.price,
      quantity: product.quantity + 1,
      image: product.img,
    }))
    this.cartService.clear();
    for (let i = 0; i < currentCartItems.length; i++) {
      await this.cartService.addItem(currentCartItems[i])
    }
    this.dataObs$.next(this.getCartItems())
  }

  sendMail(form, cart) {
    const body = { form, cart };
    return this.http.post(this.base + '/api/utils/order', body)
    .pipe(
      catchError(e => {
        throw new Error(e)
      })
    );
  }
}
