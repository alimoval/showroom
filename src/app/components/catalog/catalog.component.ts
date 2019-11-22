import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/Product';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CatalogComponent implements OnInit {

  content: string = 'Hello World!'
  public products: Product[]
  
  constructor(private productService: ProductService) { }

  ngOnInit() {
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

}
