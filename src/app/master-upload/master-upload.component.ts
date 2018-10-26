import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './../Services/user.service';
import { api_response } from '../Model/api_response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-master-upload',
  templateUrl: './master-upload.component.html',
  styleUrls: ['./master-upload.component.css']
})
export class MasterUploadComponent implements OnInit {

  fileSelected:File;
  uploadForm = new FormGroup({
  	'ip_file': new FormControl('', Validators.required)
  });	

  constructor(private toastr: ToastrService, private userService: UserService, private route: Router) { }

  ngOnInit() {
  }

  onSubmit(file){
  	
  }

  fileSelection(event){
    this.fileSelected = event.target.files[0];
  }

  onUpload(){
    if(this.fileSelected){

        this.userService.uploadBulkUser_excel(this.fileSelected).subscribe((response: api_response) =>  {
            if(response.status==200){
              this.toastr.success('User data upload successful');
              var t=this;
              setTimeout((t)=>{
                t.route.navigate(["home","user"]);
              })
            }else{
              this.toastr.error("Something went wrong!");
            }
        });
    }
  }


}
