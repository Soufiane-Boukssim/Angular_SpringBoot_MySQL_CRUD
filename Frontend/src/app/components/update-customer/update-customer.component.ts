import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Route } from '@angular/router';
import { CustomerService } from 'src/app/service/customer.service';
import { FormBuilder, Validators} from '@angular/forms';
import { Router} from '@angular/router';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css']
})
export class UpdateCustomerComponent implements OnInit {
  updateCustomerForm:FormGroup;
  id:number=this.activatedRoute.snapshot.params["id"]; //id de   {path:'customer/:id',component:UpdateCustomerComponent} de app-routing.module.ts

  constructor(private activatedRoute: ActivatedRoute,private service: CustomerService,private fb: FormBuilder, private router:Router) { }

  ngOnInit(): void {
    this.updateCustomerForm=this.fb.group({
      name:[null,[Validators.required]],
      phone:[null,[Validators.required]],
      email:[null,[Validators.required,Validators.email]],
    })
    this.getCustomerById();
  }

  getCustomerById(){
    this.service.GetCustomerById(this.id).subscribe((res)=>{
      console.log(res);
      this.updateCustomerForm.patchValue(res);
    })
  }

  updateCustomer(){
    if (!this.updateCustomerForm.invalid) {

    this.service.UpdateCustomer(this.id,this.updateCustomerForm.value).subscribe((res)=>{
      console.log(res);
      if(res.id!=null){
        this.router.navigateByUrl(""); //retourner a la page main
      }
    })

  }else{
    console.log("invalid form")
  }


  }

}
