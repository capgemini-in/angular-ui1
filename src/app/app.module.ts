import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {
  MatButtonModule, MatCheckboxModule, MatSidenavModule,
  MatToolbarModule, MatCardModule, MatInputModule, MatMenuModule,
  MatIconModule, MatListModule, MatSelectModule, MatPaginatorModule, MatSortModule,  MatTableModule
} from '@angular/material';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from "@angular/common/http";
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { HomeComponent } from './home/home.component';
import { AuthService } from './Services/auth.service';
import { LoginService } from './Services/login.service';
import { AuthGuard } from './Services/auth.guard';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserComponent } from './user/user.component';
import { BannerAddComponent } from './banner-add/banner-add.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { UserRoleListComponent } from './user-role-list/user-role-list.component';
import { RoleComponent } from './role/role.component';
import { RoleListComponent } from './role-list/role-list.component';
import { ProductComponent } from './product/product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { SmsNotificationComponent } from './sms-notification/sms-notification.component';
import { EmailGatewayComponent } from './email-gateway/email-gateway.component';
import { MasterUploadComponent } from './master-upload/master-upload.component';


@NgModule({
  
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MenuItemComponent,
    UserListComponent,
    UserComponent,
    BannerAddComponent,
    UpdateUserComponent,
    UserRoleListComponent,
    RoleComponent,
    RoleListComponent,
    ProductComponent,
    ProductListComponent,
    UpdateProductComponent,
    SmsNotificationComponent,
    EmailGatewayComponent,
    MasterUploadComponent
  ],
  imports: [
    BrowserModule,
    ToastrModule,
    FormsModule,
    MatFormFieldModule,
    MatButtonModule, MatCheckboxModule, MatSidenavModule, BrowserAnimationsModule,
    MatToolbarModule, MatCardModule, MatInputModule, ReactiveFormsModule, MatMenuModule, MatIconModule,
    MatListModule, ReactiveFormsModule, MatSelectModule,
    ToastrModule.forRoot(), MatSortModule, MatPaginatorModule,MatTableModule, HttpClientModule,
    RouterModule.forRoot([
      {path:'', component:LoginComponent},
      {
        path:'home', 
        component:HomeComponent,
        canActivate:[AuthGuard],
        children:[
          {
             path:'',
             component:BannerAddComponent,
             canActivate:[AuthGuard]
          },
          {
            path:'user',
            component:UserListComponent,
            canActivate:[AuthGuard]
          },
          {
            path:'createuser',
            component:UserComponent,
            canActivate:[AuthGuard]
          },
          {
            path:'update',
            component:UpdateUserComponent,
            canActivate:[AuthGuard]
         },
         {
            path: 'userRole',
            component: UserRoleListComponent,
            canActivate: [AuthGuard]
         },
         {
            path: 'role-list',
            component: RoleListComponent,
            canActivate: [AuthGuard]
         },
         {
            path : 'createrole',
            component: RoleComponent,
            canActivate: [AuthGuard]
         },
         {
            path: 'product-list',
            component: ProductListComponent,
            canActivate: [AuthGuard]
         },
         {
            path: 'createProduct',
            component: ProductComponent,
            canActivate: [AuthGuard]
         },
         {
          path: 'update-product',
          component: UpdateProductComponent,
          canActivate: [AuthGuard]
         },
         {
          path: 'sms',
          component: SmsNotificationComponent,
          canActivate: [AuthGuard]
         },
         {
          path: 'email',
          component: EmailGatewayComponent,
          canActivate: [AuthGuard]
         },
         {
          path: 'upload-excel',
          component: MasterUploadComponent,
          canActivate: [AuthGuard]
         }
        ]
      },
      
    ])
  ],
  providers: [
    ToastrService,
    AuthGuard,
    AuthService,
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
