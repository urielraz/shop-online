import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Injectable, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { CategoryModel } from 'src/app/models/category.model';
import { ProductModel } from 'src/app/models/product.model';
import { AuthService } from 'src/app/services/auth.service';
import { GeneratorService } from 'src/app/services/generator.service';
import { InfoService } from 'src/app/services/info.service';
import { ProductService } from 'src/app/services/products.service';


@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-products-menu',
  templateUrl: './products-menu.component.html',
  styleUrls: ['./products-menu.component.css']
})
export class ProductsMenuComponent implements OnInit{

  
  public constructor( public auth : AuthService, private productsService: ProductService, public info: InfoService, private generator: GeneratorService){}

  // private sub: Subscription

  // @Output() myCategory = new EventEmitter<number>()

  // public categoryNumber :number;
  // public textForSerach: number;
  public products?:ProductModel[];

  public productToUpdate : ProductModel ;
  updateProduct(value: ProductModel){
    // this.productToUpdate = value;
    // console.log(this.productToUpdate + "ישששש");
    // console.log(value);
    
    
  }

  public async select_category( args: number ):Promise<void>{
    // console.log(this.categoryNumber);
  //  this.categoryNumber = args

  
 
    this.products = await this.productsService.GetProductsByCategory(args);


    
          // this.category = await this.productsService.GetProductsByCategory(this.category)
  }

  public categories: CategoryModel[];


  // private sub: Subscription



  public async ngOnInit(): Promise<void> {

      //       //  Subscribe
      //   this.sub =  this.generator.generate(10).subscribe( 
      //     n => this.numbers.push(n),
      //     (err:any) => alert(err),
      //     () => console.log('done!'),
      // )

      this.categories = await this.productsService.GetAllCategories();
      
      // this.products =  await this.productsService.getAllProducts()
      this.products = await this.productsService.GetProductsByCategory(1)
          console.log(this.categories);
          
    try {
      
    } catch (error) {
      
    }

    
  }
 
}
