import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NavItem } from '../Model/nav-item';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent implements OnInit {

  @Input() items: NavItem[];
  @ViewChild('childMenu') public childMenu;
  
  constructor() { }

  ngOnInit() {
  }

}
