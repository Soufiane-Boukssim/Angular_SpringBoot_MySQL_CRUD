package com.codewithprojects.controller;

import com.codewithprojects.entity.Customer;
import com.codewithprojects.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin("*")
//@CrossOrigin(origins = "http://localhost:4200")

public class CustomerController {
    private final CustomerService customerService;

    @PostMapping("/customer")
    public Customer postCustomer(@RequestBody Customer customer) {
        return customerService.postCustomer(customer);
    }
    @GetMapping("/customers")
    public List<Customer> getAllCustomers() {
        return customerService.getAllCustomers();
    }
    @GetMapping("/customers/{id}")
    public ResponseEntity<Customer> getCustomerById(@PathVariable int id) {
        Customer customer= customerService.getCustomerById(id);
        if(customer == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(customer);
    }
    @PutMapping("/customers/{id}")
    public ResponseEntity<Customer> updateCustomer(@PathVariable int id, @RequestBody Customer customer) {
        Customer existingCustomer = customerService.getCustomerById(id);
        if(existingCustomer==null)
            return ResponseEntity.notFound().build();
        existingCustomer.setName(customer.getName());
        existingCustomer.setEmail(customer.getEmail());
        existingCustomer.setPhone(customer.getPhone());
        Customer updatedCustomer = customerService.updateCustomer(existingCustomer);
        return ResponseEntity.ok(updatedCustomer);
    }

    @DeleteMapping("/customers/{id}")
    public ResponseEntity<?> deleteCustomer(@PathVariable int id) {
        Customer existingCustomer = customerService.getCustomerById(id);
        if(existingCustomer==null)
            return ResponseEntity.notFound().build();
        customerService.deleteCustomer(id);
        return ResponseEntity.ok().build();
    }

}
