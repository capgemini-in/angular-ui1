import { Component, OnInit, ViewChild } from '@angular/core';
import {UserRoleService} from '../Services/user-role.service'
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import {userRole} from  '../Model/userRole'
import {Router} from '@angular/router';
import { api_response } from './../Model/api_response';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-role-list',
  templateUrl: './user-role-list.component.html',
  styleUrls: ['./user-role-list.component.css']
})
export class UserRoleListComponent implements OnInit {

  data : userRole[];
  dataSource :MatTableDataSource<userRole>;
  displayedColumns = [ 'roleName', 'actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private svc: UserRoleService, private routes: Router, private toastr:ToastrService) { }

  ngOnInit() {
  	this.reload();
  }

  reload(){
  	this.svc.getRolesList().subscribe((response: [userRole]) => {
  		this.data = response;
  		this.dataSource = new MatTableDataSource(this.data);
  		this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
  	});

      //this.data = [{ssoId:"1", "roleName": "End User"}, {ssoId:"2", "roleName": "DBA"}, {ssoId:"3", "roleName": "Admin"}];
      //this.data = [{"id": 1, "type": "End User"}, {ssoId:"2", "roleName": "DBA"}, {ssoId:"3", "roleName": "Admin"}];
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
  }

  onAddRole(){
    this.routes.navigate(["home", "createrole"]);
  }

  OnDeleteRole(role){
    this.svc.deleteRole(role.id).subscribe((response:api_response)=>{
      if(response.status==200){
          this.toastr.success("Role deleted successfully!");
          this.reload();
      }else if(response.status = 500){
          this.toastr.error(response.message);
      }else{
        this.toastr.error("Something went wrong!");
      }
    });
  }
  
}
