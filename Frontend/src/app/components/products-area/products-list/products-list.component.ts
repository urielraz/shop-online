import { Component, Input, OnInit } from '@angular/core';
import { CategoryModel } from 'src/app/models/category.model';
import { ProductModel } from 'src/app/models/product.model';
import { InfoService } from 'src/app/services/info.service';
import { ProductService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit{

    
//   public categoryNumber :number=2;
@Input() public hero :number



//   public select_category( args: number ):void{
    
    //     this.categoryNumber = args
    
    //     console.log(this.categoryNumber);
    
    //   }
    
    
    public products: ProductModel[];
    public categories: CategoryModel[];
    public textForSerach: number=2;

    
    public constructor( private productsService: ProductService){}
    public async ngOnInit(): Promise<void> {
  
        try {
  
            
            this.products = await this.productsService.GetProductsByCategory(2);
        } catch (error:any) {
            alert( error.message )
        }
        
    }



}
