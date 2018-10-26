import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseUrl } from './config';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  constructor(private httpClient :HttpClient) { }
  getMenu(){
    return this.httpClient.get("http://localhost:5000/Menu");
  }
}
