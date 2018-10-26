import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseUrl } from './config';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json',  
    })
  };

  constructor(private http: HttpClient) { }


  productList(){
    return this.http.get(BaseUrl+"data/products/");   
  }

  createProduct(product){
    return this.http.post(BaseUrl+"data/createProduct/",product,this.httpOptions);
  }

  prodWithId(prodId){
    return this.http.get(BaseUrl+"data/getProduct/?prodId="+prodId);
  }

  updateProduct(product){
    return this.http.post(BaseUrl+"data/editProduct/",product,this.httpOptions);
  }

  deleteProduct(prodId){
    return this.http.delete(BaseUrl+"data/deleteProduct/?prodId="+prodId,this.httpOptions);
  }
}

/*
{
        "id": 1,
        "prodId": "P01",
        "name": "Laptop HP Patil",
        "description": "Lenevo Laptop ",
        "quantity": 15,
        "price": 2000,
        "prodCategory": {
            "id": 1,
            "catId": "C01",
            "type": "Hardware"
        } 
*/