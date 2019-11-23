import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';

import { Product } from '../../models/Product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CatalogComponent implements OnInit {

  content: string = 'Hello World!'
  public products: Product[]
  public colsCounter: number
  public rowsCounter: number
  
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.colsCounter = 4;
    this.rowsCounter = 22

    if (window.innerWidth < 420) {
      this.switchCatalogItemsCount(2)
    }
    this.getProductsByCategory('raki')
  }

  getProducts() {
    this.productService.getProducts()
      .subscribe(products => {
        this.products = products;
      })
  }

  getProductsByCategory(category) {
    this.productService.getProductsByCategory(category)
      .subscribe(products => {
        this.products = products;
      })
  }

  tabChangeHandler(event: MatTabChangeEvent) {
    let textLabel = event.tab.textLabel
    let category: string
    if (textLabel === 'МИДИИ') {
      category = 'midii'
    } else if (textLabel === 'РАКИ') {
      category = 'raki'
    } else if (textLabel === 'РЫБА') {
      category = 'riba'
    }
    this.getProductsByCategory(category)
  }

  onResize(event) {
    if (event.target.innerWidth > 420 && event.target.innerWidth < 640) {
      this.switchCatalogItemsCount(3);
    } else if (event.target.innerWidth < 420) {
      this.switchCatalogItemsCount(2);
    } else if (event.target.innerWidth > 640) {
      this.switchCatalogItemsCount(4);
    }
  }

  switchCatalogItemsCount(count) {
    this.colsCounter = count;
    if (count == 2) {
      this.rowsCounter = 16
    } else if (count == 3) {
      this.rowsCounter = 13
    } else {
      this.rowsCounter = 20
    }
  }

}
