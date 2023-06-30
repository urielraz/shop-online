import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { ProductService } from 'src/app/services/products.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  // providers: [
  //   {
  //     provide: STEPPER_GLOBAL_OPTIONS,
  //     useValue: {showError: true},
  //   },
  // ],
})
export class RegisterComponent {

    // firstFormGroup = this._formBuilder.group({
    //     firstCtrl: ['', Validators.required],
    //   });
    //   secondFormGroup = this._formBuilder.group({
    //     secondCtrl: ['', Validators.required],
    //   });
    

    stepOne: FormGroup;
    stepTwo: FormGroup;
    

    public constructor(private builder: FormBuilder, private auth: AuthService, private router: Router,  private toastr: ToastrService, public productService: ProductService ){
      this.stepOne = builder.group(
        {
          isNotEmpty: [
            '',
            Validators.compose(
              [Validators.required]
            )
          ]
        }
      )
    }
    public user = new UserModel();

    public confirmPassword: string;
    
    public ifEmail: boolean=true;

    public async ifEmailExist():Promise<any>{
      this.ifEmail = true

      try {
        this.ifEmail = await this.productService.ifEmailExist(this.user.username)
      } catch (error) {
        
      }
      console.log(this.ifEmail);
      
      return this.ifEmail

      

       
      // if(this.user.username=="123"){
      // if(this.produ){
        // this.ifEmail = false
      // }
      // return this.ifEmail
    }


    public async register():Promise<void>{

        try {
            await this.auth.register( this.user );
            this.toastr.success('Welcome to the club!!!');   
        } catch (error:any) {
            alert( error.message )
        }
        this.router.navigateByUrl('/home');
    }

}
