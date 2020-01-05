import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params, Router } from '@angular/router'

import { switchMap, mergeMap } from 'rxjs/operators'

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
  public cartItem: any;

  colsCounter: number
  rowsCounter: number

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private scroller: ScrollerService,
    private shoppingcart: ShoppingcartService,
  ) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.getProductById()
      .pipe(
        mergeMap(product => {
          this.product = product;
          return this.shoppingcart.getData()
        }),
        mergeMap(data => {
          this.cart = data;
          for(let i = 0; i < this.cart.length; i++){
            if (this.cart[i].name == this.product.name) {
              this.showCartItemQuantity(this.cart[i]);
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
            }, 300);
          });
        }
      })
    if (window.innerWidth <= 470) {
      this.switchCatalogItemsCount(1)
    } else {
      this.switchCatalogItemsCount(2)
    }
  }

  showCartItemQuantity(cartItem) {
    this.cartItem = cartItem;
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
    if (event.target.innerWidth > 460 && event.target.innerWidth <= 690) {
      this.switchCatalogItemsCount(2)
    } else if (event.target.innerWidth <= 460) {
      this.switchCatalogItemsCount(1)
    } else if (event.target.innerWidth > 690) {
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

  onClickAddButton() {
    if (this.cartItem) {
      this.shoppingcart.addQuantity(this.cartItem)
    } else {
      this.shoppingcart.addItem(this.product);
    }
  }

  onClickRemoveButton() {
    if (this.cartItem) {
      this.shoppingcart.removeQuantity(this.cartItem)
    }
  }
}
