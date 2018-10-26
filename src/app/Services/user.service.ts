import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { User } from '../Model/UserModel';
import { BaseUrl } from './config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  
 
  
  constructor(private http: HttpClient) { }


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json',
      
    })
  };

  userList(){
    return this.http.get(BaseUrl+"api/user/");
  }

  createUser(user){
    return this.http.post(BaseUrl+"api/newUser/",user,this.httpOptions);
  }

  deleteUser(userid) {
    //console.log(deleteUser);
    return this.http.delete(BaseUrl+"api/deleteUser/?ssoId="+userid);
  }

  updateUser(updateUser){

    return this.http.post(BaseUrl+"api/editUser/",updateUser,this.httpOptions);
  }

  userWithId(ssoId){
    return this.http.get(BaseUrl+"api/getUser/?ssoId="+ssoId);
  }
  
  uploadBulkUser_excel(file:File):Observable<any>{
    let formData = new FormData();
    formData.append("userupload",file);
    return this.http.post(BaseUrl+"files/bulkUpload/", formData);
  }
}
