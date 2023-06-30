import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrdersModel } from 'src/app/models/orders.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/products.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  
  constructor(public auth: AuthService,
    public productsService: ProductService,
    private router: Router , private toastr: ToastrService
    ){}
    
    public order = new OrdersModel();

    public ifdateTaken:boolean=true;

    public async ifDate():Promise<any>{
      this.ifdateTaken= true;
      try {
        
        this.ifdateTaken = await this.productsService.checkIfDateTaken(this.order.date_delivery)
      } catch (error) {
        
      }
      console.log(this.ifdateTaken);

      return this.ifdateTaken
      
    }

    public city = this.auth.user.city;
    public street = this.auth.user.street;

    public fillCity(){
      console.log("dadadasd");
      this.order.city = this.city
      
    }
    
    public fillStreet(){
      this.order.street = this.street

    }
    
    public async send(){
      this.productsService.sumOfCartSubject.subscribe(newSum=>{
        this.order.final_price = newSum
      })
      // console.log(this.order.final_price);
      
      this.order.user_id=this.auth.user.id
      this.order.cart_id=this.productsService.cart_id
      // this.order.final_price = this.productsService.theSumOfCart
      // console.log(this.order.final_price);
      
    // this.order.user_id=this.auth.user.id
    // this.order.user_id=this.auth.user.id
    
    // console.log( await this.productsService.sumOfCart(this.order.cart_id))
    
    
    try {
   
      // this.order.final_price = await this.productsService.sumOfCart(this.order.cart_id);
      await this.productsService.addNewOrderForUser(this.order);
      this.toastr.success('Your order has been successfully received in the system!!');
      this.router.navigateByUrl('/home');
      
      // this.product.image = this.productImage.nativeElement.files[0];
      // const newProduct = await this.productsService.addNewProduct( this.product )
      // alert('Product Added: ' + newProduct.product_id );
      // this.router.navigateByUrl('/products')
      
    } catch (error:any) {
      alert(error.message)
    }
    
  }
  

}
