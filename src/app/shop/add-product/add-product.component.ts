import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit{
  product: any = {};  
  isEdit: boolean = false;

  constructor(
    private productService: ShopService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.isEdit = true;
        this.productService.getProduct(id).subscribe({
          next: (product) => this.product = product,
          error: (err) => console.error('Error fetching product:', err)
        });
      }        

    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.getBase64Image(file).then(base64Image => {
        this.product.productimage = base64Image;
      }).catch(err => {
        console.error('Error reading file:', err);
      });
    }
  }

  getBase64Image(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = () => reject('Failed to read file');
      reader.readAsDataURL(file);
    });
  }

  saveProduct() {
    if (this.isEdit) {
      this.productService.updateProduct(this.product.id, this.product).subscribe({
        next: () => this.router.navigate(['/products']),
        error: (err) => console.error('Error updating product:', err)
      });
    } else {
      this.productService.addProduct(this.product).subscribe({
        next: () => this.router.navigate(['/products']),
        error: (err) => console.error('Error adding product:', err)
      });         
    }
  }
}

