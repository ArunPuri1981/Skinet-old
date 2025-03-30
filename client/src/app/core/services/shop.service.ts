import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Pagination } from '../../shared/models/pagination';
import { Product } from '../../shared/models/product';
import { ShopParams } from '../../shared/models/shopParams';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = 'http://localhost:5042/api/'

  private http = inject(HttpClient);

  //filtering based on Types and Brand
  types: string[] = [];
  brands: string[] = [];


  getProduct(ShopParams: ShopParams) {
    let params = new HttpParams();

    if (ShopParams.brands.length > 0) {
      params = params.append('brands', ShopParams.brands.join(','));
    }

    if (ShopParams.types.length > 0) {
      params = params.append('types', ShopParams.types.join(','));
    }

    if(ShopParams.sort)
      {
        params = params.append('sort', ShopParams.sort);
      }

      if(ShopParams.search){
        params = params.append('search', ShopParams.search);
      }

    params = params.append('pageSize', ShopParams.pageSize);//for page size
    params = params.append('pageIndex', ShopParams.pageNumber);

    return this.http.get<Pagination<Product>>(this.baseUrl + 'products', { params });
  };

  getBrand() {
    if (this.brands.length > 0) return;

    return this.http.get<string[]>(this.baseUrl + 'products/brands').subscribe({
      next: response => this.brands = response
    })
  };

  getTypes() {
    if (this.types.length > 0) return;

    return this.http.get<string[]>(this.baseUrl + 'products/types').subscribe({
      next: response => this.types = response
    })
  }
}
