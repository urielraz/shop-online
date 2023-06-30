import { Component, OnInit } from '@angular/core';
import { OrdersModel } from 'src/app/models/orders.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/products.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  
  public constructor(private productsService: ProductService,  public auth: AuthService){}
  
  public user = this.auth;
  public count: number;
  public orders: number;
  public check_cart_by_user:number;
  public last_order:OrdersModel;

  // public async open_new_cart_for_user():Promise<void>{
  //   await this.productsService.addNewCartForUser(this.auth.user.id)
  // }


  public async ngOnInit(): Promise<void> {

    try {

      // this.check_cart_by_user = await this.productsService.Open_new_cart_or_enter__existing_cart(this.auth?.user.id)
      // this.last_order = await this.productsService.GetLastOrderById(this.auth?.user.id)
      this.count = await this.productsService.countAllProducts();
      this.orders = await this.productsService.countAllOrders();
      console.log(this.count)

    } catch (error:any) {
        console.log(error.message)
    }

}

}


