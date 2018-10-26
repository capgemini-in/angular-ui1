import { Component, OnInit } from '@angular/core';
import {RoleService} from '../Services/role.service'
import { FormGroup, FormControl } from '@angular/forms';
import { role } from './../Model/userRole';
import { Toast, ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

  roleForm = new FormGroup({
    RoleName : new FormControl(),
    Desc: new FormControl(),
    Access : new FormControl()
  });

  constructor(private svc: RoleService, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
  
  }

  onSubmit(roleData){
    //alert("clicked..");
    this.svc.postAddRole({'type' :roleData["RoleName"]}).subscribe( (response:role) => {
        if(response && response.status == 200){
          this.toastr.success("Role added successfully.");
          this.roleForm.setValue({
            'RoleName': '',
            'Desc': '',
            'Access': []
          });
          this.router.navigate(["home","userRole"]);
        }else{
          this.toastr.error("Something went wrong, please try again.");
        }
    });
  }
}
