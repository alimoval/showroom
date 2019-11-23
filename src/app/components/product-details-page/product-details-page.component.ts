import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { switchMap } from 'rxjs/operators';

import { ProductService } from '../../services/product.service';
import { Product } from 'src/app/models/Product';

@Component({
  selector: 'app-product-details-page',
  templateUrl: './product-details-page.component.html',
  styleUrls: ['./product-details-page.component.css']
})
export class ProductDetailsPageComponent implements OnInit {

  public product: Product

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.getProductById();
  }

  getProductById() {
    this.route.params
      .pipe(switchMap((params: Params) => this.productService.getProductById(params['id'])))
      .subscribe(product => {
        console.log(product)
        this.product = product
      });
  }
}
