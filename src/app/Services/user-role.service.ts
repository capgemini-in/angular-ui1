import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { userRole } from '../Model/userRole';
import { Observable } from 'rxjs';
import { BaseUrl } from './config';


@Injectable({
  providedIn: 'root'
})
export class UserRoleService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json',
      
    })
  };

  getRolesList():Observable<any>{
  	return this.http.get(BaseUrl+"roles/listRoles/", this.httpOptions);
  }

  deleteRole(roleId):Observable<any>{
    return this.http.delete(BaseUrl+"roles/deleteRole/?userProfileId="+roleId, this.httpOptions);
  }
}
