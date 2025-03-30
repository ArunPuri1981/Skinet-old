import { Component, OnInit, inject } from '@angular/core';
import { ShopService } from '../../core/services/shop.service';
import { Product } from '../../shared/models/product';
import { MatCard } from '@angular/material/card';
import { ProductItemComponent } from "./product-item/product-item.component";
import { MatDialog } from '@angular/material/dialog';
import { FilterDialogComponent } from './filter-dialog/filter-dialog.component';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatListOption, MatSelectionList, MatSelectionListChange } from '@angular/material/list';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { ShopParams } from '../../shared/models/shopParams';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Pagination } from '../../shared/models/pagination';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    MatCard,
    ProductItemComponent,
    MatButton,
    MatIcon,
    MatMenu,
    MatSelectionList,
    MatListOption,
    MatMenuTrigger,
    MatPaginator,
    FormsModule
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit {

  private shopService = inject(ShopService);
  private dialogService = inject(MatDialog);

  products?: Pagination<Product>;

  sortOptions = [
    { name: "Alphabetical", value: 'name' },
    { name: "Price Low-Hig", value: 'priceAsc' },
    { name: "Price Hig-Low", value: "priceDesc" },
  ]

  shopParams = new ShopParams();
  pageSizeOptions = [5, 10, 15, 20, 100];

  ngOnInit(): void {
    this.initializeShop();
  }

  initializeShop() {
    this.shopService.getBrand();

    this.shopService.getTypes();

    this.getProduct();

  }

  getProduct() {
    this.shopService.getProduct(this.shopParams).subscribe({
      next: response => this.products = response,
      error: error => console.error('Error:', error),
      //error: error => console.log(error)
    })
  }

  onSearchChanged(){
    this.shopParams.pageNumber = 1;
    this.getProduct();
  }

  onSortChange(event: MatSelectionListChange) {
    const selectedOption = event.options[0];
    if (selectedOption) {
      this.shopParams.sort = selectedOption.value;
      this.shopParams.pageNumber = 1;
      this.getProduct();
    }
  }

  handlePageEvent(event : PageEvent){
    this.shopParams.pageNumber = event.pageIndex + 1;
    this.shopParams.pageSize = event.pageSize;
    this,this.getProduct();
  }

  openFilterDialog() {
    const dialogRef = this.dialogService.open(FilterDialogComponent, {
      minWidth: '500px',
      data: {
        selectedBrands: this.shopParams.brands,
        selectedTypes: this.shopParams.types,
      }
    });
    dialogRef.afterClosed().subscribe({
      next: result => {
        if (result) {
          console.log(result);
          this.shopParams.brands = result.selectedBrands;
          this.shopParams.types = result.selectedTypes;
          this.shopParams.pageNumber = 1;
          //apply filter
          this.getProduct();

        }
      }
    })
  }

}
