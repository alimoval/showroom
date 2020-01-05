import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params, Router } from '@angular/router'

import { switchMap, mergeMap } from 'rxjs/operators'

import { CartService, BaseCartItem } from 'ng-shopping-cart';

import { Product } from 'src/app/models/Product'

import { ProductService } from '../../services/product/product.service'
import { ScrollerService } from 'src/app/services/scroller/scroller.service'
import { ShoppingcartService } from 'src/app/services/shopingcart/shopingcart.service';

@Component({
  selector: 'app-product-details-page',
  templateUrl: './product-details-page.component.html',
  styleUrls: ['./product-details-page.component.css']
})
export class ProductDetailsPageComponent implements OnInit {

  public product: Product
  public cart: any
  colsCounter: number
  rowsCounter: number

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private scroller: ScrollerService,
    private shoppingcart: ShoppingcartService,
    private cartService: CartService<BaseCartItem>,
  ) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.getProductById()
      .pipe(
        mergeMap(product => {
          this.product = product;
          console.log('this.product', this.product);
          return this.shoppingcart.getData()
        }),
        mergeMap(data => {
          this.cart = data;
          console.log('this.cart', this.cart);
          for(let i = 0; i < this.cart.length; i++){
            if (this.cart[i].name == this.product.name) {
              this.showItemsQuantity(this.cart[i].quantity);
            }
          }
          return this.scroller.getData()
        }),
      )
      .subscribe(data => {
        if (this.router.url !== '/') {
          this.router.navigate(['/']).then(res => {
            setTimeout(() => {
              this.scrollToCategory(data);
            }, 200);
          });
        }
      })

    if (window.innerWidth < 420) {
      this.switchCatalogItemsCount(1)
    } else {
      this.switchCatalogItemsCount(2)
    }
  }

  showItemsQuantity(data) {
    console.log('@@@', data);
  }

  scrollToCategory(data) {
    if (this.router.url === '/') {
      const elem = document.getElementById(data);
      const yOffset = -120;
      const y = elem.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }

  getProductById() {
    return this.route.params
      .pipe(switchMap((params: Params) => this.productService.getProductById(params['id'])))
  }

  onResize(event) {
    if (event.target.innerWidth > 420 && event.target.innerWidth < 640) {
      this.switchCatalogItemsCount(2)
    } else if (event.target.innerWidth < 420) {
      this.switchCatalogItemsCount(1)
    } else if (event.target.innerWidth > 640) {
      this.switchCatalogItemsCount(2)
    }
  }

  switchCatalogItemsCount(count) {
    this.colsCounter = count
    if (count == 2) {
      this.rowsCounter = 17
    } else {
      this.rowsCounter = 12
    }
  }

  onClickBuyButton() {
    const items = this.cartService.getItems();
    for (let i = 0; i < items.length; i++) {
      if (this.product.name === items[i].name) {
        this.cartService.removeItem(items[i].id);
        const item = new BaseCartItem({ id: items[i].id, name: items[i].name, price: items[i].price, quantity: items[i].quantity + 1, });
        this.cartService.addItem(item);
      }
    }
    // const item = new BaseCartItem({ name: this.product.name, price: this.product.price, quantity: 1 });
    //     this.cartService.addItem(item);
  }
}
