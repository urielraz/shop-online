import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryModel } from 'src/app/models/category.model';
import { ProductModel } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/products.service';
import { AppConfig } from 'src/app/utils/app-config.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit{
  public constructor(
  private productsService: ProductService,
  private router: Router,
  private route: ActivatedRoute,
  private toastr: ToastrService,
  private config: AppConfig

  ){}
  
  public categories: CategoryModel[];
  public product = new ProductModel();

  public imgSrc = this.config.images;
  public imgName:string;

  public async ngOnInit(): Promise<void>{
    
    let productId = +this.route.snapshot.paramMap.get("id")
    try {

      this.imgName = await this.productsService.getImgByProId(productId)

      console.log(this.imgName);

      this.categories = await this.productsService.GetAllCategories();
      
    } catch (error) {
      console.log(error);
    }

    
    // let productId = +this.route.snapshot.url[1].path
    // console.log(this.route.snapshot.url[1].path);
    console.log(productId);
    
    this.product.product_id = productId
    // this.productsService.getProductById(productId)
    
    // throw new Error('Method not implemented.');
    
  }
  
  
    @ViewChild('productImage')
    public productImage: ElementRef<HTMLInputElement>
    
    public async update(){
      
      try {
      console.log(this.product.product_id);
        this.product.image = this.productImage.nativeElement.files[0];
        const updateProduct = await this.productsService.updateProduct( this.product )
        this.toastr.success('Product Update: ' + updateProduct.product_id ); 
        //  alert('Product Update: ' + updateProduct.product_id );
        this.router.navigateByUrl('/products-menu')

    } catch (error:any) {
        alert(error.message)
    }

    }

    public cancel(){
      this.router.navigateByUrl('/products-menu')

    }
}

  