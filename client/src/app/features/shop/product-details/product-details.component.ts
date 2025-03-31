import { Component, OnInit, inject } from '@angular/core';
import { ShopService } from '../../../core/services/shop.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../shared/models/product';
import { CurrencyPipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    CurrencyPipe,
    MatIcon,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    MatDivider

  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {

  private shopService = inject(ShopService);
  private activatedRoute = inject(ActivatedRoute);
  product? : Product;

  ngOnInit(): void {
    this.loadProduct();
    
  }


  loadProduct()
  {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(!id) return;

    // + with id is used to cast the string into number
    this.shopService.getProductDetails(+id).subscribe({
      next: product => this.product = product,
      error: error => console.error('Error:', error)
    })
  }
}
