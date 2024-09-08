import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as productsData from './products.json';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  data = productsData;

  constructor() {}

  getProducts(): Observable<any> {
    return of(this.data.products);
  }
}
