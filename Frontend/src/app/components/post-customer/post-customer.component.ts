import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators} from '@angular/forms';
import {CustomerService} from 'src/app/service/customer.service';
import { Router} from '@angular/router';


@Component({
  selector: 'app-post-customer',
  templateUrl: './post-customer.component.html',
  styleUrls: ['./post-customer.component.css']
})
export class PostCustomerComponent implements OnInit {
  postCustomerForm: FormGroup;

  
  constructor(private customerService:CustomerService,private fb:FormBuilder,private router:Router) { 

  }

  ngOnInit(): void {
    this.postCustomerForm=this.fb.group({
      name:[null],
      phone:[null,[Validators.required]],
      email:[null,[Validators.required,Validators.email]],
    })
  }
  postCustomer(){
    console.log(this.postCustomerForm.value);
    //si les champs ne sont pas vide
    if (!this.postCustomerForm.invalid) {
      this.customerService.postCustomer(this.postCustomerForm.value).subscribe((res)=>{
      console.log(res);
      this.router.navigateByUrl("/") //revenir a la page mere apres ajout d'1 obj
    })
    //
    }else{
      console.log("invalid form")
    }
  }

}
