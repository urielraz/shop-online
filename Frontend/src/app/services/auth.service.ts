import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { CredentialsModel } from '../models/credentials.model';
import { UserModel } from '../models/user.model';
import { AppConfig } from '../utils/app-config.service';
import  jwtDecode  from 'jwt-decode';
import { ProductService } from './products.service';
import { Router } from '@angular/router';
import { MyCartComponent } from '../components/cart/my-cart.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    public cart_id:number=0

    public user: UserModel;
    private token: string;
    public productsService: ProductService

    constructor( private http: HttpClient, private config: AppConfig, private router: Router){
        const token = window.localStorage.getItem('token')
        if( token ) this.setUser(token)
    }

    

    // Register
    public async register( user: UserModel ): Promise<void> {
        const observable = this.http.post<string>( this.config.register, user );
        const token = await firstValueFrom(observable);
        this.setUser(token)
    }

    // Login
    public async login( credentials: CredentialsModel): Promise<void> {
        const observable = this.http.post<string>( this.config.login, credentials );
        const token = await firstValueFrom(observable);
        this.setUser(token)
      
        
    }

    // Logout
    public async logout(){
        this.token = '';
        window.localStorage.removeItem('token')
        this.router.navigateByUrl('/home');

        
        // this.productsService.sumOfCartSubject.unsubscribe()
        // this.productsService.productsByCartSubject.unsubscribe()
        // this.productsService.cart_idSubject.unsubscribe()
        // await this.productsService.setCartByUser()
        // await this.productsService.getAllProductsByCart()
        // await this.productsService.sumOfCart()
   
    }

    // Set User
    private setUser(token: string):void{
        this.token = token;
        window.localStorage.setItem('token', token );
        const decode: any = jwtDecode( token )
        this.user = decode.user;
    }

    public isLoggedin():boolean{
        return this.token && this.token != ''
    }

    public getToken():string{
        return this.token;
    }
    public isAdmin():boolean{
        return this.user.role ==="Admin";
    }


}
