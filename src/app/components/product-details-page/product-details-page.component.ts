import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params, Router } from '@angular/router'

import { switchMap } from 'rxjs/operators'

import { Product } from 'src/app/models/Product'

import { ProductService } from '../../services/product/product.service'
import { ScrollerService } from 'src/app/services/scroller/scroller.service'
import { ShopingcartService } from 'src/app/services/shopingcart/shopingcart.service'

@Component({
  selector: 'app-product-details-page',
  templateUrl: './product-details-page.component.html',
  styleUrls: ['./product-details-page.component.css']
})
export class ProductDetailsPageComponent implements OnInit {

  public product: Product
  public cart: object
  colsCounter: number
  rowsCounter: number

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private scroller: ScrollerService,
    private shopingcart: ShopingcartService,
  ) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.getProductById()
    // this.scroller.getData()
    //   .subscribe(data => {
    //     if (this.router.url !== '/') {
    //       this.router.navigate(['/']).then(res => {
    //         setTimeout(() => {
    //           this.scrollToCategory(data);
    //         }, 200);
    //       });
    //     }
    //   })
    this.shopingcart.getData()
      .subscribe((data: any) => {
        console.log('data@@@', data);
        this.cart = data;
      })
    if (window.innerWidth < 420) {
      this.switchCatalogItemsCount(1)
    } else {
      this.switchCatalogItemsCount(2)
    }
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
    this.route.params
      .pipe(switchMap((params: Params) => this.productService.getProductById(params['id'])))
      .subscribe(product => {
        this.product = product
      })
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
    this.shopingcart.saveCart(this.product);
  }
}
