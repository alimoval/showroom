import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params, Router } from '@angular/router'

import { switchMap } from 'rxjs/operators'

import { ProductService } from '../../services/product/product.service'
import { Product } from 'src/app/models/Product'

@Component({
  selector: 'app-product-details-page',
  templateUrl: './product-details-page.component.html',
  styleUrls: ['./product-details-page.component.css']
})
export class ProductDetailsPageComponent implements OnInit {

  public product: Product
  colsCounter: number
  rowsCounter: number

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.getProductById()
    if (window.innerWidth < 420) {
      this.switchCatalogItemsCount(1)
    } else {
      this.switchCatalogItemsCount(2)
    }
  }

  getProductById() {
    this.route.params
      .pipe(switchMap((params: Params) => this.productService.getProductById(params['id'])))
      .subscribe(product => {
        console.log(product)
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
}
