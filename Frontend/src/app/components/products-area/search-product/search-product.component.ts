import { Component } from '@angular/core';
import { ProductModel } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/products.service';
import { ProductsMenuComponent } from '../products-menu/products-menu.component';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css']
})
export class SearchProductComponent {
  
  public constructor (public productService: ProductService , public ProductsMenuComponent:ProductsMenuComponent ){}

  public textForSerach: string;

  // public products?:ProductModel[];

  // public bdika:any;

  public async search(args: Event):Promise<any>{

    if(this.textForSerach==""){
      this.ProductsMenuComponent.products =  await this.productService.getAllProducts()
      return
    }
    
    try {
      // this.ifEmail = await this.productService.ifEmailExist(this.user.username)
      this.ProductsMenuComponent.products =  await this.productService.search(this.textForSerach)
      // console.log(this.bdika.product_id + "dddada");
      // alert('Searching: ' + this.textForSerach );

      

    } catch (error) {
      
    }
 
    // if(this.user.username=="123"){
    // if(this.produ){
      // this.ifEmail = false
    // }
    // return this.ifEmail
  }


}
