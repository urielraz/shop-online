import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';




import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from './components/layout-area/layout/layout.component';
import { HeaderComponent } from './components/layout-area/header/header.component';
import { FooterComponent } from './components/layout-area/footer/footer.component';
import { MenuComponent } from './components/layout-area/menu/menu.component';
import { HomeComponent } from './components/layout-area/home/home.component';
import { SearchComponent } from './components/home-area/search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsListComponent } from './components/products-area/products-list/products-list.component';
import { PageNotFoundComponent } from './components/layout-area/page-not-found/page-not-found.component';
import { ProductCardComponent } from './components/products-area/product-card/product-card.component';
import { AddProductComponent } from './components/products-area/add-product/add-product.component';
import { RegisterComponent } from './components/auth-area/register/register.component';
import { LoginComponent } from './components/auth-area/login/login.component';
import { AuthMenuComponent } from './components/auth-area/auth-menu/auth-menu.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from './utils/jwt.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { ProductsMenuComponent } from './components/products-area/products-menu/products-menu.component';
import { MyCartComponent } from './components/cart/my-cart.component';
import { OrderComponent } from './components/order/order.component';
import {TooltipModule} from "ngx-bootstrap/tooltip";
import { SearchProductComponent } from './components/products-area/search-product/search-product.component';
import { AdminComponent } from './components/products-area/admin/admin.component';
import { UpdateProductComponent } from './components/products-area/update-product/update-product.component';
import { CartModeComponent } from './components/home-area/cart-mode/cart-mode.component'


@NgModule({
  declarations: [
    
  
    LayoutComponent,
            HeaderComponent,
            FooterComponent,
            MenuComponent,
            HomeComponent,
            SearchComponent,
            ProductsListComponent,
            PageNotFoundComponent,
            ProductCardComponent,
            AddProductComponent,
            RegisterComponent,
            LoginComponent,
            AuthMenuComponent,
            ProductsMenuComponent,
            MyCartComponent,
            OrderComponent,
            SearchProductComponent,
            AdminComponent,
            UpdateProductComponent,
            CartModeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    TooltipModule.forRoot(),
    MatSlideToggleModule,
    MatTabsModule,
    MatButtonModule,
    MatStepperModule,
    MatFormFieldModule
    
  ],
  exports:[],
  providers: [
    {useClass: JwtInterceptor, provide: HTTP_INTERCEPTORS, multi: true}
  ],
  bootstrap: [LayoutComponent]
})
export class AppModule { }
