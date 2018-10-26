import { Component, OnInit, ViewChild } from '@angular/core';
import {RoleService} from '../Services/role.service'
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import {Role} from '../Model/Role';
import {Router} from '@angular/router';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {

  data : Role[];
  dataSource : MatTableDataSource<Role>;
  displayedColumns = ['roleName', 'desc', 'actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private svc: RoleService, private route:Router) { }

  ngOnInit() {
  	this.reload();
  }

  reload(){
  	this.svc.getRoles().subscribe((response : Role[])=>{
  		this.data = response;
  		this.dataSource = new MatTableDataSource(this.data);
  		this.dataSource.sort = this.sort;
  		this.dataSource.paginator =  this.paginator;
  	});
  }

  OnAddRole(){
    this.route.navigate(['home/createrole'])
  }

}
