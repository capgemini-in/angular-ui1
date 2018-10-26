import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { UserService } from '../Services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserRoleService } from '../Services/user-role.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  roleCheckBox = [new FormControl(), new FormControl(), new FormControl()]
  
  userForm = new FormGroup({
    firstName : new FormControl(),
    lastName : new FormControl(),
    ssoId: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    userProfiles: new FormArray([new FormControl(), new FormControl(), new FormControl()])
  })

  roles = [
    {id:1, type: "END USER"},
    {id:2, type: "ADMIN"},
    {id:3, type: "DBA"}
  ]

  constructor(private userSErvice:UserService,private route:Router, private toastr: ToastrService, private roleService: UserRoleService ) { }


  ngOnInit() {
    ///console.log(this.userForm)
    /*this.userForm.setValue({
      firstName : "",
      lastName: "",
      ssoId: "",
      email: "",
      password: "",
      userProfiles: ""
    });*/
    this.roleService.getRolesList().subscribe(response=>{
      if(response){
        let roleCheckBox_arr = new Array();
        for(let i=0;i<response.length;i++){
          roleCheckBox_arr.push(new FormControl());
        }
        let roleCheckBoxForm = new FormArray(roleCheckBox_arr);

        this.userForm.setControl('userProfiles',roleCheckBoxForm);
        this.roles = response;
      }
    });
  }

  Companies =["Capgemini","Wells Fargo","Dell"];
  Groups =["Group 1","Group 2","Group 3","Group 4"];
  AllStatus =["Active","InActive"];

  onSubmit(user){
    //console.log(userform);
    let roleSelected = user["userProfiles"];
    //console.log(roleSelected);
    user["userProfiles"] = new Array();
    const roles= this.roles;
    roleSelected.forEach(function(c, i){
      if(c){
        user["userProfiles"].push(roles[i]);
      }
    });

    console.log(user);


    //roleSelected= parseInt(roleSelected);
    //user["userProfiles"] = [this.roles[roleSelected-1]]
    this.userSErvice.createUser(user).subscribe(response=>{
        this.toastr.success("User added successfully!")
        this.route.navigate(['home/user']);
    })
  }
}
