import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/layout-area/home/home.component';
import { ProductsListComponent } from './components/products-area/products-list/products-list.component';
import { AddProductComponent } from './components/products-area/add-product/add-product.component';
import { AuthGuard } from './utils/auth.guard';
import { RegisterComponent } from './components/auth-area/register/register.component';
import { LoginComponent } from './components/auth-area/login/login.component';
import { PageNotFoundComponent } from './components/layout-area/page-not-found/page-not-found.component';
import { ProductsMenuComponent } from './components/products-area/products-menu/products-menu.component';
import { OrderComponent } from './components/order/order.component';
import { UpdateProductComponent } from './components/products-area/update-product/update-product.component';
import { AdminGuard } from './utils/admin.guard';

const routes: Routes = [
  {path: 'home', component: HomeComponent },
  // {path: 'products', component: ProductsListComponent  },
  {path: 'update/:id', component: UpdateProductComponent , canActivate: [AdminGuard] },
  {path: 'products-menu', component: ProductsMenuComponent, canActivate: [AuthGuard]},
  {path: 'products/new', component: AddProductComponent, canActivate: [AdminGuard] },
  {path: 'register', component: RegisterComponent },
  {path: 'login', component: LoginComponent },
  {path: 'order', component: OrderComponent , canActivate: [AuthGuard]},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
