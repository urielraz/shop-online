import { Component, OnInit } from '@angular/core';
import { InfoService } from 'src/app/services/info.service';
import { ProductService } from 'src/app/services/products.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

    public name: any

    public constructor( public info: InfoService, public product:ProductService ){}

    ngOnInit(): void {
        // this.info.getName().subscribe( n => this.name = n )
        // this.name = this.info.getAllProOfCart()
        this.product.productsByCartSubject.subscribe(newName=>{
          this.name = newName
          // console.log(this.name+"ds");
          
        })
    }

}
