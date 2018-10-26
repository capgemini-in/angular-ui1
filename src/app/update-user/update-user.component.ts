import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { User } from '../Model/UserModel';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../Services/user.service';
import { ToastrService } from 'ngx-toastr';
import { UserRoleService } from '../Services/user-role.service';


@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  
  roleCheckBox = [new FormControl(), new FormControl(), new FormControl()]

   userForm = new FormGroup({
    firstName : new FormControl(),
    lastName : new FormControl(),
    ssoId: new FormControl({disabled: true}),
    email: new FormControl(),
    password: new FormControl(),
    userProfiles: new FormArray([new FormControl(), new FormControl(), new FormControl()])
  });

  roles = [
    {id:1, type: "END USER"},
    {id:2, type: "ADMIN"},
    {id:3, type: "DBA"}
  ]

  constructor(private activatedRoute:ActivatedRoute, private userService:UserService, private route :Router, private toastr: ToastrService, private roleService:UserRoleService) { 
    
  }
   UpdateData;
  
  Companies =["Capgemini","Wells Fargo","Dell"];
  Groups =["Group 1","Group 2","Group 3","Group 4"];
  AllStatus =["Active","InActive"];

 

  ngOnInit() {
   const t=this;

  

   this.activatedRoute.paramMap.subscribe(param=>{
     //console.log(param);
     let id = param.get('userid');

     

     this.userService.userWithId(id).subscribe((response:any)=>{
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
      setTimeout(()=>{
        console.log(response);
        this.userForm.setValue({
          firstName:response.firstName,
          lastName:response.lastName,
          ssoId:response.ssoId,
          email:response.email,
          password: "",
          userProfiles: t.setRolesSelected(response.userProfiles)//new FormArray(t.setRolesSelected(response.userProfiles))
          //response.userProfiles[0]["id"]
        });
      },1000);


    });
   })
    
  }

  onUpdate(user){
    //console.log(userform);
    //let roleSelected = user["userProfiles"];
    //roleSelected= parseInt(roleSelected);
    //user["userProfiles"] = [this.roles[roleSelected-1]]

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


    this.userService.updateUser(user).subscribe(response=>{
        this.toastr.success("User updated successfuly!");
        this.route.navigate(['home/user']);
    })
  }
  
  setRolesSelected(rolesSel){
    let rolesSel_id = new Array();
    rolesSel.forEach(function(j){
        rolesSel_id.push(j.id);
    });

    console.log(rolesSel_id)

    let rolesCheckBox = new Array();

    for(let i=0;i<this.roles.length;i++){
      let checked= false;
      if(rolesSel_id.indexOf(this.roles[i]['id'] )>-1){
        checked= true;
      }
      rolesCheckBox.push(checked);
    }
    console.log(rolesCheckBox);
    return rolesCheckBox;
  }
 
}
