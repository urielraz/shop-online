import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { ItemsOfCartModel } from 'src/app/models/itemsOfCart.model';
import { ProductModel } from 'src/app/models/product.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/products.service';
import { AppConfig } from 'src/app/utils/app-config.service';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css']
})
export class MyCartComponent implements OnInit {


  public cart_id:number=0
  public itemsOfCart: ItemsOfCartModel[]=[];  
  public finalPrice:number=0
  public imgSrc = this.config.images;
  public imgString?:string="";

  public constructor( 
    public productsService: ProductService,
    private config: AppConfig,
    public auth: AuthService,
    private toastr: ToastrService,
    private route: ActivatedRoute

    // public http: HttpClient
  ){}

  

  public async delAllCart(){

    // this.toastr.('Are you sure?', {onOk: () => { console.log('ok') }, onCancel: () => { console.log('cancel')}})



    if(!window.confirm('Are You Sure?')) return;
   try {
     await this.productsService.deleteALLItemFromCart(this.cart_id)
     this.toastr.success('העגלה נמחקה!');
     await this.productsService.getAllProductsByCart()
     await this.productsService.sumOfCart()
    } catch (error:any) {
      alert(error.message)

    }
  }
  
  public async deleteCompletelyItemFromCart(product_id:number){
    try {
          await this.productsService.deleteCompletelyItemFromCart(this.cart_id, product_id)
          // this.toastr.success('הפריט נמחק!');
          await this.productsService.getAllProductsByCart()
          await this.productsService.sumOfCart()
    } catch (error:any) {
      alert(error.message)
  
    }
}

  public async getImg(product_id:number):Promise<void>{
    
    try {
      console.log(product_id);
      
      //  this.imgString = await this.productsService.getImgByProId(product_id)
    } catch (error:any) {
      alert(error.message)

    }
  }


 public path:any

  public async ngOnInit():Promise<void>{
    // this.cart_id = this.productsService.cart_id
    this.path = this.route.snapshot.url[0].path
    console.log((this.path));
    
    this.productsService.cart_idSubject.subscribe(newCart_id=>{
    this.cart_id = newCart_id
    // console.log(this.cart_id + "df");
    })

    this.productsService.productsByCartSubject.subscribe(newproductsByCart=>{
      this.itemsOfCart = newproductsByCart
      // console.log(this.itemsOfCart.map(d=>d.quantity) + "888");
    })

    // this.itemsOfCart= this.productsService.productss
    // console.log(this.itemsOfCart);

    this.productsService.sumOfCartSubject.subscribe(newSum=>{
      this.finalPrice = newSum
    })


      
  
  }
  
  // public async summm(){

  //   try {
  //     this.finalPrice = await this.productsService.sumOfCart(this.cart_id);
      
      
  //   } catch (error) {
      
  //   }
    
  // }
}
