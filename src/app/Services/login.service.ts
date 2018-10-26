import { Injectable } from '@angular/core';

import { ILogin } from '../Model/Login';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseUrl } from './config';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  
  constructor(private http:HttpClient) { }

  //  httpOptions = {
  //   headersOptions : new HttpHeaders({
  //     "Content-Type":"appliaction/json" 
  //   })
  // };

   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json',
      
    })
  };
   
   
  login(login : ILogin):Observable<any>{
   // return this.http.post("http://localhost:5000/" +"Login/Authenticate",login,this.httpOptions);   
    return this.http.post(BaseUrl+"restservices/validateAccount",login,this.httpOptions);      
  }
}
