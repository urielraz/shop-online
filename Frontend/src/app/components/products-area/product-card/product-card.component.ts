import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ItemsOfCartModel } from 'src/app/models/itemsOfCart.model';
import { ProductModel } from 'src/app/models/product.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/products.service';
import { AppConfig } from 'src/app/utils/app-config.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

    public constructor( 
        private productsService: ProductService,
        private config: AppConfig,
        public auth: AuthService,
    ){}

    @Input()
    public product: ProductModel;
    
    public imgSrc = this.config.images;

    // public async deleteProduct(){
    //     try {
            
    //         if(!window.confirm('Are You Sure?')) return;
    //         await this.productsService.DeleteOneProduct( this.product.product_id )
    //         alert('Deleted!!!');
            
    //     } catch (error:any) {
    //         alert(error.message)
    //     }
    // }

    public ItemOfCart=new ItemsOfCartModel;
    public async addItemToCart(product:ProductModel){
        
        try {
            this.ItemOfCart.cart_id =  this.productsService.cart_id
            
        } catch (error:any) {
            alert(error.message)

     }

        // this.ItemOfCart.cart_id=5;
        // this.ItemOfCart.general_price=2;
        // this.ItemOfCart.item_id=1;
        this.ItemOfCart.quantity=1;
        this.ItemOfCart.product_id=product.product_id;
        console.log(this.ItemOfCart);
        console.log(product);
        
        
        try {
            await this.productsService.addNewItemToCart(this.ItemOfCart )
            await this.productsService.getAllProductsByCart()
            await this.productsService.sumOfCart()


        } catch (error:any) {
               alert(error.message)

        }
    }

    public async deleteItemFromCart(product:ProductModel){
        
        this.ItemOfCart.product_id=product.product_id;
        try {

            this.ItemOfCart.cart_id =  this.productsService.cart_id
            await this.productsService.deleteItemFromCart(this.ItemOfCart.cart_id,this.ItemOfCart.product_id )
            this.productsService.getAllProductsByCart()
             this.productsService.sumOfCart()



        } catch (error:any) {
            alert(error.message)

     }

    }
    @Output() childEvent = new EventEmitter<ProductModel>();
    public async updateProduct(product:ProductModel){
        this.childEvent.emit(product)
        console.log(product);
        
    }

    

}
