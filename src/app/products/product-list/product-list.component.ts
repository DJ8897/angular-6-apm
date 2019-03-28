import { Component, OnInit } from '@angular/core';
import { IProduct } from '../product';
import { ProductService } from './product.service';

@Component({
  selector: 'pm-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle: String = 'Product List';
  imageWidth: Number = 50;
  imageMargin: Number = 2;
  showImage: Boolean = false;
  errorMessage: string;
  _listFilter: string; // private variables starts with _ in ts
  // listFilter: String = 'cart';
  // private _productService;

  // constructor(productService: ProductService) {
  //   this.filteredProducts = this.products;
  //   this.listFilter = 'cart';
  //   this._productService = productService;
  // }

  constructor(private productService: ProductService) {}

  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter
      ? this.performFilter(this.listFilter)
      : this.products;
  }

  filteredProducts: IProduct[];
  products: IProduct[] = []; // any is the data-type when we dont know the data type

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter(
      (product: IProduct) =>
        product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  onRatingClicked(message: string): void {
    this.pageTitle = 'Product List : ' + message;
  }

  ngOnInit(): void {
    console.log('In OnInit');
    this.productService.getProducts().subscribe(
      products => {
        (this.products = products), (this.filteredProducts = this.products);
      },
      error => (this.errorMessage = <any>error)
    );
  }
}
