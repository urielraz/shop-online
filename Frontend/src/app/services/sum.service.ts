import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { ProductModel } from "../models/product.model";
import { AppConfig } from "../utils/app-config.service";
import { CartModel } from "../models/cart.model";
import { ItemsOfCartModel } from "../models/itemsOfCart.model";
import { CategoryModel } from "../models/category.model";
import { OrdersModel } from "../models/orders.model";
import { AuthService } from "./auth.service";
import { ProductService } from "./products.service";

@Injectable({
    providedIn: 'root'
})
export class sumService{

    public cart_id= this.productsService.cart_id;
    public theSumOfCart:number

    public constructor(public auth: AuthService, private http: HttpClient, private config: AppConfig, public productsService: ProductService){
               this.sumOfCart(this.cart_id)

    }

    public async sumOfCart(cart_id:number): Promise<void>{
        const observable = this.http.get<number>( this.config.sumOfCart + cart_id );
        const sum = await firstValueFrom(observable);
        this.theSumOfCart=sum;
        // return sum
    }
}