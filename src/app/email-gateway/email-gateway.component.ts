import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SmsNotificationService } from '../Services/sms-notification.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-email-gateway',
  templateUrl: './email-gateway.component.html',
  styleUrls: ['./email-gateway.component.css']
})
export class EmailGatewayComponent implements OnInit {

  emailForm = new FormGroup({
  	fromEmail : new FormControl('', Validators.required),
  	toEmail: new FormControl('', Validators.required),
  	ccEmail: new FormControl(''),
  	subject: new FormControl('', Validators.required),
  	content: new FormControl('', Validators.required)
  });

  constructor(private toastr: ToastrService, private serv: SmsNotificationService) { }

  ngOnInit() {
  }

  onSubmit(emailData){

    this.emailForm.setValue({
      fromEmail: "",
      toEmail: "",
      ccEmail: "",
      subject: "",
      content: ""
    });

  	this.serv.sendEmail(emailData).subscribe(response=>{
        //this.toastr.success("User added successfully!")
        //this.route.navigate(['home/user']);
    });
    this.toastr.success("Email sent successfully!");
  }
}
