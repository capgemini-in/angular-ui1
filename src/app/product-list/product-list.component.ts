import { Component, OnInit,ViewChild, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../Services/product.service';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
    
  // add to cart form
  atcForm = new FormGroup({
      cmd :  new FormControl(),
      add :  new FormControl(),
      item_name :  new FormControl(),
      amount :  new FormControl(),
      currency_code :  new FormControl(),
      business :  new FormControl()
  }); 

  cmd_value = "_cart";
  business_value= "kin@kinskards.com";
  add_value=1;
  item_name_value="";
  currency_code_value = "INR";
  amount_value = 0;

  displayedColumns = ["prodID", "prodName", "desc", "category", "actions"];
  @Output('useredit') prodEdit = new EventEmitter();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @ViewChild('atcForm1') atcFormElement;  
  @ViewChild('business') businessElement;

  data: any;
  dataSource: MatTableDataSource<any>;

  constructor(private route: Router, private productService: ProductService, private toastr: ToastrService){}

  ngOnInit() {
  	this.reloadData();
  }

   reloadData(){
      this.productService.productList().subscribe((response)=>{
        //console.log(response);
        this.data = response;
        //console.log(this.data);
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
    }

  OnAddProduct(){
  	this.route.navigate(['home/createProduct'])
  }

  OnEditProduct(product){
  	let id = product.prodId; 
    this.route.navigate(['home/update-product',{product_id:id}]);
  }

  OnDeleteProduct(product){
  	let id = product.prodId; 
    this.productService.deleteProduct(id).subscribe(response=>{
    	if(response){
    		this.toastr.success("Product "+id+" deleted successfully.");
    	 	this.reloadData();
    	}else{
    		this.toastr.error("Somethign went wrong.");
    	}
    });
  }

  addToCart(product){
        this.item_name_value = product.name;
        this.amount_value = product.price;

        
        /*this.atcForm.setValue({
          cmd :  this.business_value,
          add :  this.business_value,
          item_name :  this.business_value,
          amount :  this.business_value,
          currency_code :  this.business_value,
          business :  this.business_value
        });*/

        //this.atcFormElement.nativeElement.business.nativeElement.value = "hello";
        console.log(this.atcFormElement.nativeElement.business.value); 
        
        this.atcFormElement.nativeElement.submit();
  }
}
