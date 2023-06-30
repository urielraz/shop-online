import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CredentialsModel } from 'src/app/models/credentials.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/products.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

    public cart_id:number=0


    public constructor( private auth: AuthService, private router: Router , private toastr: ToastrService,  public productsService: ProductService ){}

    public credentials = new CredentialsModel();

    public async login():Promise<void>{

        try {
            await this.auth.login( this.credentials );
            {
                
            }
            // window.location.reload();
            this.toastr.success('Welcome back!');
            this.router.navigateByUrl('/home');

        } catch (error:any) {
            this.toastr.error("Incorrect username or password");
            return
        }
        try {
            this.productsService.cart_idSubject.subscribe(newCart_id=>{
                this.cart_id = newCart_id
                console.log(this.cart_id + "df");
            })
            await this.productsService.setCartByUser()
            await this.productsService.getAllProductsByCart()
            await this.productsService.sumOfCart()
            
        } catch (error) {
            console.log(error);
            
        }


        
    }

}
