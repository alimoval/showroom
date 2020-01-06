import { Component, OnInit, ViewEncapsulation } from '@angular/core'
import { Router } from '@angular/router'

import { mergeMap } from 'rxjs/operators'
import { of, forkJoin } from 'rxjs'

import { BaseCartItem } from 'ng-shopping-cart'

import { Product } from '../../models/Product'
import { ProductService } from '../../services/product/product.service'
import { ScrollerService } from 'src/app/services/scroller/scroller.service'
import { ShoppingcartService } from 'src/app/services/shopingcart/shopingcart.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CatalogComponent implements OnInit {

  public cartItems: BaseCartItem[]
  public products: Product[]
  public riba: Product[] = []
  public meal: Product[] = []
  public krevetki: Product[] = []
  public raki: Product[] = []
  public sneaks: Product[] = []
  public beer: Product[] = []

  public colsCounter: number
  public rowsCounter: number

  constructor(
    private router: Router,
    private productService: ProductService,
    private scroller: ScrollerService,
    private shoppingcart: ShoppingcartService,
  ) { }

  ngOnInit() {
    this.colsCounter = 4
    this.rowsCounter = 17
    if (window.innerWidth <= 640) {
      this.switchCatalogItemsCount(2)
    }
    if (window.innerWidth > 640 && window.innerWidth <= 900) {
      this.switchCatalogItemsCount(3)
    }
    if (window.innerWidth > 900) {
      this.switchCatalogItemsCount(4)
    }
    this.getProducts()
      .pipe(mergeMap(products => {
        const cartItems = this.shoppingcart.getData()
        return forkJoin([of(products), of(cartItems)])
      }),
        mergeMap(([products, items]) => {
        console.log('[ products, items ]', products, items)
        const upProducts = products.map(product => {
          product.quantity = 6
          return product
        })
        console.log('upProducts', upProducts)

        for (let i = 0; i < products.length; i++) {
          this.handleProductItem(products[i])
        }
        const cartItems = this.shoppingcart.getCartItems()
        for (let i = 0; i < cartItems.length; i++) {
          let item = cartItems[i]
          for (let b = 0; b < products.length; b++) {
            let product = products[b]
            if (item.name == product.name) {
              console.log('@@@@@', i)
            }
          }
        }
        return of(products)
      }),
      mergeMap(data => {
        return this.scroller.getData()
      }),)
    .subscribe(data => {
      setTimeout(() => {
        this.scrollToCategory(data);
      }, 400);
    });
  }

  getProducts() {
    return this.productService.getProducts()
  }

  handleProductItem(item) {
    switch (item.category) {
      case 'riba':
        this.riba.push(item)
        break
      case 'meal':
        this.meal.push(item)
        break
      case 'krevetki':
        this.krevetki.push(item)
        break
      case 'raki':
        this.raki.push(item)
        break
      case 'sneaks':
        this.sneaks.push(item)
        break
      case 'beer':
        this.beer.push(item)
        break
      default:
        console.log('default');
    }
  }

  getProductsByCategory(category) {
    this.productService.getProductsByCategory(category)
      .subscribe(products => {
        this.products = products
      })
  }

  scrollToCategory(data) {
    if (this.router.url === '/') {
      const elem = document.getElementById(data);
      const yOffset = -120;
      const y = elem.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }

  onResize(event) {
    if (event.target.innerWidth <= 640) {
      this.switchCatalogItemsCount(2)
    } else if (event.target.innerWidth > 640 && event.target.innerWidth <= 900) {
      this.switchCatalogItemsCount(3)
    } else if (event.target.innerWidth > 900) {
      this.switchCatalogItemsCount(4)
    }
  }

  switchCatalogItemsCount(count) {
    this.colsCounter = count
    if (count == 2) {
      this.rowsCounter = 16
    } else if (count == 3) {
      this.rowsCounter = 15
    } else {
      this.rowsCounter = 20
    }
  }

  onClickRemoveButton(product) {

  }

  onClickAddButton(product) {
    
  }

}
