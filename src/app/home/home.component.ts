import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { MenuService } from '../Services/menu.service';
import { NavItem } from '../Model/nav-item';


import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [trigger('menu_collapse',[
    state('true',style({
      display: 'block'
    })),
    state('false',style({
      display: 'none'
    })),
    transition('true => false', animate('200ms ease-in')),
    transition('false => true', animate('200ms ease-in'))
  ]),
  trigger('menu_selected',[
    state('true',style({
      display: 'none'
    })),
    state('false',style({
      display: 'block'
    }))
  ])

  ]
})
export class HomeComponent implements OnInit {

  data :NavItem[] =[];
  menu_collapse = [false,false,false,false];
  isAdmin:boolean= false;
  constructor( private authservice :AuthService, private menuService :MenuService) { }
  
  
  ngOnInit() {
     this.menuService.getMenu().subscribe((response:NavItem[])=> {
      //console.log(response);
      this.data = response;
      //console.log(this.data);
    });
    let userDetails = this.authservice.getUserDetails();
    //alert(userDetails);
    if(userDetails){
        userDetails= JSON.parse(userDetails);
        if(userDetails["userType"]){
            if(userDetails["userType"].toLowerCase() == "role_admin"){
              this.isAdmin =true;
            }
        }
    }
  }
  logout(){
    this.authservice.logout();
  }

  menuCollapse_toggle(index){
    //hide all before showing
    if(this.menu_collapse.indexOf(true)>-1 && !this.menu_collapse[index]){
      this.menu_collapse[this.menu_collapse.indexOf(true)] = false;
    }
    this.menu_collapse[index] = this.menu_collapse[index] == true ? false : true;
  }
}
