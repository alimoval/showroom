import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

import { Product } from '../models/Product';

import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public base: string;
  private productsUrl = '/api/products'

  constructor(
    private http: HttpClient,
    ) { 
    this.base = environment.serverConfig.host + environment.serverConfig.port
  }

  getProducts(): Observable<Product[]> {
    return this.http.get(this.base + this.productsUrl)
      .pipe(map((response: Product[]) => response))
  }

  getProductsByCategory(category): Observable<Product[]> {
    return this.http.get(this.base + this.productsUrl + '/' + category)
      .pipe(map((response: Product[]) => response))
  }
}
