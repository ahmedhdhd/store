import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-list-produit',
  templateUrl: './list-produit.component.html',
  styleUrls: ['./list-produit.component.scss']
})
export class ListProduitComponent implements OnInit {
  products: Product[] = [];
  totalCount = 0;

  constructor(private shopService: ShopService) {}
  ngOnInit(): void {
this.getProducts()  }

  getProducts() {
    this.shopService.getProducts().subscribe({
      next: response => {
        this.products = response.data;
        this.totalCount = response.count;
      },
      error: error => console.log(error)
    })
  }
  deleteProduct(id : number){
this.shopService.deleteproduct(id).subscribe({
  next :() => { this.ngOnInit() } ,

  error: error => console.log(error)


})
  }

}
