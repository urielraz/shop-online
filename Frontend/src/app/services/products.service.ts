import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject, firstValueFrom } from "rxjs";
import { ProductModel } from "../models/product.model";
import { AppConfig } from "../utils/app-config.service";
import { CartModel } from "../models/cart.model";
import { ItemsOfCartModel } from "../models/itemsOfCart.model";
import { CategoryModel } from "../models/category.model";
import { OrdersModel } from "../models/orders.model";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class ProductService{

    public cart_idSubject = new BehaviorSubject<number>(0);
    public sumOfCartSubject = new BehaviorSubject<number>(0);
    public productsByCartSubject = new BehaviorSubject<ItemsOfCartModel[]>([]);

    public cart_id:number
    public theSumOfCart:number
    public productss: ItemsOfCartModel[];
    // public theSumOfCart:number

    public constructor(public auth: AuthService, private http: HttpClient, private config: AppConfig ){

       if(auth.isLoggedin()) this.setCartByUser()
    //    this.getAllProductsByCart()
    //    this.sumOfCart()

    }



    public async setCartByUser(): Promise<any>{
        const observable = this.http.get<number>( this.config.findCartByUser + this.auth.user.id );
        const cart_id = await firstValueFrom(observable);
        this.cart_id = cart_id;
        this.cart_idSubject.next(this.cart_id)
        // return cart_id
        this.getAllProductsByCart();
        this.sumOfCart()
    }



    public async countAllProducts(): Promise<number>{
        const observable = this.http.get<number>( this.config.countAllProducts);
        const products = await firstValueFrom(observable);
        return products;
    }
    public async countAllOrders(): Promise<number>{
        const observable = this.http.get<number>( this.config.countAllOrders );
        const products = await firstValueFrom(observable);
        return products;
    }

    public async addNewProduct( product: ProductModel ):Promise<ProductModel> {

        const formData = new FormData();
        formData.append('product_name', product.product_name );
        formData.append('product_category', product.product_category.toString() );
        formData.append('price', product.price.toString() );
        // formData.append('stock', product.stock.toString() );
        formData.append('image', product.image );

        // let key : keyof typeof product;
        // for (key in product ) {
        //     let v = product[key];
        //     if( typeof v === 'number') v = v.toString();
        //     formData.append( key,  v )
        // }

        const observable = this.http.post<ProductModel>(this.config.products, formData );
        const addedProduct = await firstValueFrom( observable );
        return addedProduct;
    }
    public async updateProduct( product: ProductModel ):Promise<ProductModel> {
        
        const formData = new FormData();
        // formData.append('product_id', product.product_id.toString() );
        formData.append('product_name', product.product_name );
        console.log(formData);
        formData.append('product_category', product.product_category.toString() );
        formData.append('price', product.price.toString() );
        // formData.append('stock', product.stock.toString() );
        formData.append('image', product.image );
        
        
        // let key : keyof typeof product;
        // for (key in product ) {
        //     let v = product[key];
        //     if( typeof v === 'number') v = v.toString();
        //     formData.append( key,  v )
        // }

        const observable = this.http.patch<ProductModel>(this.config.products + product.product_id , formData );
        const addedProduct = await firstValueFrom( observable );
        return addedProduct;
    }
    public async addNewCartForUser(user_id:number): Promise<CartModel>{
        const formData = new FormData();
        formData.append('user_id', user_id.toString() );


        const observable = this.http.post<CartModel>( this.config.addNewCartForUser + user_id,formData );
        const cart = await firstValueFrom(observable);
        return cart;
    }
    public async addNewItemToCart( items_of_cart: ItemsOfCartModel ):Promise<ItemsOfCartModel> {

        const formData = new FormData();
        formData.append('product_id', items_of_cart.product_id.toString() );
        formData.append('quantity', items_of_cart.quantity.toString() );
        formData.append('cart_id', items_of_cart.cart_id.toString() );
        // formData.append('stock', product.stock.toString() );
        // formData.append('image', items_of_cart.image );

        // let key : keyof typeof product;
        // for (key in product ) {
        //     let v = product[key];
        //     if( typeof v === 'number') v = v.toString();
        //     formData.append( key,  v )
        // }

        const observable = this.http.post<ItemsOfCartModel>(this.config.addNewItemToCart, formData );
        const addedProduct = await firstValueFrom( observable );
        return addedProduct;
    }

    public async deleteItemFromCart( cart_id:number, product_id:number ): Promise<void>{
        const observable = this.http.delete(this.config.deleteItemFromCart + cart_id + "/" + product_id);
        await firstValueFrom( observable );
    }

    public async deleteALLItemFromCart( cart_id:number ): Promise<void>{
        const observable = this.http.delete(this.config.deleteALLItemFromCart + cart_id);
        await firstValueFrom( observable );
    }

    public async GetProductsByCategory(product_category:number): Promise<ProductModel[]>{
        const observable = this.http.get<ProductModel[]>( this.config.GetProductsByCategory + product_category );
        const products = await firstValueFrom(observable);
        return products;
    }

    public async GetAllCategories(): Promise<CategoryModel[]>{
        const observable = this.http.get<CategoryModel[]>( this.config.GetAllCategories );
        const categories = await firstValueFrom(observable);
        return categories;
    }

    public async findCartByUser(user:number): Promise<number>{
        const observable = this.http.get<number>( this.config.findCartByUser + user );
        const cart_id = await firstValueFrom(observable);
        return cart_id;
    }

    public async getAllProductsByCart(): Promise<any>{
        const observable = this.http.get<any>( this.config.getAllProductsByCart + this.cart_id);
        this.productss= await firstValueFrom(observable);
        
        this.productsByCartSubject.next(this.productss)
        
        // console.log(this.cart_id + "sds");
        // return products;
    }

    
    public async addNewOrderForUser( order: OrdersModel ):Promise<OrdersModel> {

        const formData = new FormData();
        // formData.append('user_id', order.user_id );
        // formData.append('product_category', product.product_category.toString() );
        // formData.append('price', product.price.toString() );
        // formData.append('stock', product.stock.toString() );
        // formData.append('image', product.image );

        let key : keyof typeof order;
        for (key in order ) {
            let v = order[key].toString();
            // if( typeof v === 'number') v = v.toString();
            formData.append( key,  v )
        }

        const observable = this.http.post<OrdersModel>(this.config.addNewOrderForUser, formData );
        const addedOrder = await firstValueFrom( observable );
        return addedOrder;
    }

    public async sumOfCart(): Promise<void>{
        const observable = this.http.get<number>( this.config.sumOfCart + this.cart_id );
        const sum = await firstValueFrom(observable);
        // this.theSumOfCart = sum;
        this.theSumOfCart=sum;
        this.sumOfCartSubject.next(this.theSumOfCart)
        // return sum
    }

    public async getImgByProId(pro_id:number): Promise<string>{
        const observable = this.http.get<number>( this.config.getImgByProId + pro_id );
        const imgSrc = await firstValueFrom(observable);
        return imgSrc.toString();
    }

    public async deleteCompletelyItemFromCart( cart_id:number, product_id:number ): Promise<void>{
        const observable = this.http.delete(this.config.deleteCompletelyItemFromCart + cart_id + "/" + product_id);
        await firstValueFrom( observable );
    }

    public async ifEmailExist(email:string ): Promise<boolean>{
        const observable = this.http.get<boolean>(this.config.ifEmailExist + email);
        const bool = await firstValueFrom( observable );
        return bool
    }

    public async search(search_name:string): Promise<ProductModel[]>{
        const observable = this.http.get<ProductModel[]>( this.config.search + search_name );
        const products = await firstValueFrom(observable);
        return products;
    }
    public async getAllProducts(): Promise<ProductModel[]>{
        const observable = this.http.get<ProductModel[]>( this.config.getAllProducts );
        const products = await firstValueFrom(observable);
        return products;
    }

    public async getProductById(id:number): Promise<ProductModel>{

        const observable = this.http.get<ProductModel>( this.config.GetProductsById + id );
        const product = await firstValueFrom(observable);
        return product;
    }

    public async Open_new_cart_or_enter__existing_cart(id:number): Promise<number>{

        const observable = this.http.get<number>( this.config.Open_new_cart_or_enter__existing_cart + id );
        const num = await firstValueFrom(observable);
        return num;
    }

    public async GetLastOrderById(id:number): Promise<OrdersModel>{

        const observable = this.http.get<OrdersModel>( this.config.GetLastOrderById + id );
        const data = await firstValueFrom(observable);
        return data;
    }

    public async checkIfDateTaken(date:string): Promise<boolean>{

        const observable = this.http.get<boolean>( this.config.checkIfDateTaken + date );
        const data = await firstValueFrom(observable);
        return data;
    }

   
  






 
   

    public async DeleteOneProduct( id:number ): Promise<void>{
        const observable = this.http.delete(this.config.products + id );
        await firstValueFrom( observable );
    }

}