import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class AppConfig{

    private url = 'http://localhost:3001/api/';
    public countAllProducts = this.url + 'countAllProducts/';
    public countAllOrders = this.url + 'countAllOrders/';
    public GetProductsByCategory = this.url + 'GetProductsByCategory/';
    public Open_new_cart_or_enter__existing_cart = this.url + 'Open_new_cart_or_enter__existing_cart/';
    public GetLastOrderById = this.url + 'GetLastOrderById/';
    public checkIfDateTaken = this.url + 'checkIfDateTaken/';
 
    public GetProductsById = this.url + 'GetProductsById/';
    public addNewCartForUser = this.url + 'addNewCartForUser/';
    public addNewItemToCart = this.url + 'addNewItemToCart/';
    public deleteItemFromCart = this.url + 'deleteItemFromCart/';
    public deleteCompletelyItemFromCart = this.url + 'deleteCompletelyItemFromCart/';
    public deleteALLItemFromCart = this.url + 'deleteALLItemFromCart/';
    public GetAllCategories = this.url + 'GetAllCategories/';
    public getImgByProId = this.url + 'getImgByProId/';
    public findCartByUser = this.url + 'findCartByUser/';
    public getAllProductsByCart = this.url + 'getAllProductsByCart/';
    public addNewOrderForUser = this.url + 'addNewOrderForUser/';
    public sumOfCart = this.url + 'sumOfCart/';
    public products = this.url + 'products/';
    public images = this.url + 'products/images/';
    public register = this.url + 'auth/register';
    public login = this.url + 'auth/login';
    public ifEmailExist = this.url + 'ifEmailExist/';
    public search = this.url + 'search/';
    public getAllProducts = this.url + 'getAllProducts/';

}