import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SmsNotificationService } from '../Services/sms-notification.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-sms-notification',
  templateUrl: './sms-notification.component.html',
  styleUrls: ['./sms-notification.component.css']
})
export class SmsNotificationComponent implements OnInit {

  smsForm = new FormGroup({
  	to : new FormControl('',[Validators.required]),
  	message: new FormControl('',[Validators.required])
  });

  constructor(private serv: SmsNotificationService, private toastr: ToastrService) { }

  ngOnInit() {
  }

  onSubmit(smsData){
  	this.smsForm.setValue({
  		to: "",
  		message: ""
  	});
  	
    this.toastr.success("SMS sent successfully!");
    let mobile= smsData["to"];
    smsData["to"] = [mobile];
    this.serv.sendSMS(smsData).subscribe(response=>{
        //this.toastr.success("User added successfully!")
        //this.route.navigate(['home/user']);
    });
  }

}
