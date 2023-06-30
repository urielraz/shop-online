import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ItemsOfCartModel } from '../models/itemsOfCart.model';
import { ProductService } from './products.service';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

    public constructor( 
        private productsService: ProductService,
        // private config: AppConfig,
        // public auth: AuthService,
        
        // public http: HttpClient
      ){}

    private name = new BehaviorSubject<string>('Northwind 2.0');
    public itemsOfCartSubject = new Subject<ItemsOfCartModel[]>()
    itemsOfCart:ItemsOfCartModel[];

    public getName():Observable<string>{
        return this.name;
    }

    public upgrade():void{
        this.name.next('Northwind 2.1');
    }

    public async getAllProOfCart():Promise<void>{
        // this.itemsOfCart= await this.productsService.getAllProductsByCart(6)

        // this.itemsOfCart.next(await this.productsService.getAllProductsByCart(this.productsService.cart_id))
        this.itemsOfCartSubject.next(this.itemsOfCart)
    }

    public myData:any;

}
