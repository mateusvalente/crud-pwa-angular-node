import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  Product,
  ProductPayload,
} from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly apiUrl = '/api/products';

  constructor(
    private readonly http: HttpClient,
  ) {}

  list(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  findById(id: number): Observable<Product> {
    return this.http.get<Product>(
      `${this.apiUrl}/${id}`
    );
  }

  create(product: ProductPayload): Observable<Product> {
    return this.http.post<Product>(
      this.apiUrl,
      product
    );
  }

  update(
    id: number,
    product: ProductPayload,
  ): Observable<Product> {
    return this.http.put<Product>(
      `${this.apiUrl}/${id}`,
      product
    );
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );
  }
}
