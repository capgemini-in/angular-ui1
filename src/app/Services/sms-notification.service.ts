import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseUrl } from './config';

@Injectable({
  providedIn: 'root'
})
export class SmsNotificationService {

 httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json',  
    })
  };

  constructor(private http: HttpClient){

  }

  sendSMS(smsData){
    let smsData1 = {"sender":"SOCKET","route":"4","country":"91","sms":[smsData]};
    console.log(smsData1)
  	return this.http.post(BaseUrl+"util/sms/",smsData1,this.httpOptions);
  }

  sendEmail(emailData){
  	return this.http.post(BaseUrl+"util/email/",emailData,this.httpOptions);
  }
}
