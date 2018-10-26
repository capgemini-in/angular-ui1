import { Component, OnInit,ViewChild, Output, EventEmitter } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { User } from '../Model/UserModel';
import { UserService } from '../Services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  
  displayedColumns = ['firstName','lastName','login','emailId','actions'];
  @Output('useredit') useredit = new EventEmitter<User>();
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor( private userService:UserService,private route:Router, private toastr: ToastrService) { }
  data: any;
  dataSource: MatTableDataSource<User>;
  

    ngOnInit() {
          
         this.reloadData();
          
    }

    reloadData(){
      this.userService.userList().subscribe((response:User[])=>{
        //console.log(response);
        this.data = response;
        //console.log(this.data);
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

      });
    }

    OnAddUser(){
      this.route.navigate(['home/createuser']);
    }
    OnDeleteUser(deleteUser){
      
      this.userService.deleteUser(deleteUser.ssoId).subscribe(response=>{
        this.toastr.success("User deleted successfully.");
        this.reloadData();
      })
      
    }
    OnEditUser(updateUser){
      let id = updateUser.ssoId; 
      this.route.navigate(['home/update',{userid:id}]);
      // this.userService.updateUser(updateUser).subscribe(response=>{
      //   this.reloadData();
      // })
    }
}
