import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseUrl } from './config';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json',
      
    })
  };

  constructor(private http: HttpClient) { }

  getRoles():Observable<any>{
  	return this.http.get(BaseUrl+"listRoles/",this.httpOptions);
  }

  postAddRole(roleData):Observable<any>{
    return this.http.post(BaseUrl+"roles/newRole/", roleData, this.httpOptions );
  }
}
