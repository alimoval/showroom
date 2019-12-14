import { Component, OnInit, ViewEncapsulation } from '@angular/core'

import { Product } from '../../models/Product'
import { ProductService } from '../../services/product/product.service'
import { ScrollerService } from 'src/app/services/scroller/scroller.service'

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CatalogComponent implements OnInit {

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
    private productService: ProductService,
    private scroller: ScrollerService
  ) { }

  ngOnInit() {
    this.colsCounter = 4
    this.rowsCounter = 17

    if (window.innerWidth < 420) {
      this.switchCatalogItemsCount(2)
    }
    this.getProducts()
    this.scroller.getData().subscribe(data => {
      this.scrollToCategory(data)
    })
  }

  getProducts() {
    this.productService.getProducts()
      .subscribe(products => {
        for (let i = 0; i < products.length; i++) {
          this.handleProductItem(products[i])
        }
        this.products = products
      })
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
    const elem = document.getElementById(data);
    const yOffset = -120;
    const y = elem.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }

  onResize(event) {
    if (event.target.innerWidth > 420 && event.target.innerWidth < 640) {
      this.switchCatalogItemsCount(3)
    } else if (event.target.innerWidth < 420) {
      this.switchCatalogItemsCount(2)
    } else if (event.target.innerWidth > 640) {
      this.switchCatalogItemsCount(4)
    }
  }

  switchCatalogItemsCount(count) {
    this.colsCounter = count
    if (count == 2) {
      this.rowsCounter = 16
    } else if (count == 3) {
      this.rowsCounter = 13
    } else {
      this.rowsCounter = 20
    }
  }

}
