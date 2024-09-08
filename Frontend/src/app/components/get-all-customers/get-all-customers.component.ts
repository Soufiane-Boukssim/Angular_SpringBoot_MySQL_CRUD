import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-get-all-customers',
  templateUrl: './get-all-customers.component.html',
  styleUrls: ['./get-all-customers.component.css']
})
export class GetAllCustomersComponent implements OnInit {

  customers:any=[];

  constructor(private customerService: CustomerService) { 
  }

  ngOnInit(): void {
    this.getAllCustomers();
  }

  getAllCustomers(){
    this.customerService.GetAllCustomers().subscribe((res)=>{
      console.log(res);
      this.customers=res;
    })
  }

  deleteCustomer(id: number){
    this.customerService.DeleteCustomer(id).subscribe((res)=>{ 
      console.log(res);
      this.getAllCustomers();
    })
  }

}
