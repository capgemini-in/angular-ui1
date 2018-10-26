import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { User } from '../Model/UserModel';
import { BaseUrl } from './config';

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
    return this.http.get(BaseUrl+"User/all");
  }

  createUser(user){
    return this.http.post<User>(BaseUrl+"User",user,this.httpOptions);
  }

  deleteUser(userid) {
    //console.log(deleteUser);
    return this.http.delete(BaseUrl+"User?userId="+userid);
  }

  updateUser(updateUser){

    return this.http.put(BaseUrl+"User",updateUser,this.httpOptions);
  }

  userWithId(id:number){
    return this.http.get(BaseUrl+"User/withid?id="+id);
  }
  
}
