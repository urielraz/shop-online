import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryModel } from 'src/app/models/category.model';
import { ProductModel } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

    public constructor(
    private productsService: ProductService,
    private router: Router,
    private toastr: ToastrService
    ){}

    public categories: CategoryModel[];

    public async ngOnInit():Promise<void>{
        this.categories = await this.productsService.GetAllCategories();
          
      try {
        
      } catch (error) {
        console.log(error);
        
      }

    }

    public product = new ProductModel();

    @ViewChild('productImage')
    public productImage: ElementRef<HTMLInputElement>

    public async send(){

        try {
            
            console.log(this.product);
            this.product.image = this.productImage.nativeElement.files[0];
            const newProduct = await this.productsService.addNewProduct( this.product )
            this.toastr.success('Product Added: ' + newProduct.product_id );   

            this.router.navigateByUrl('/products-menu')

        } catch (error:any) {
            alert(error.message)
        }

    }

    
    public cancel(){
        this.router.navigateByUrl('/products-menu')
  
      }

}
