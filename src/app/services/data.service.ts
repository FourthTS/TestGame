import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  postdata(postData:number[][]){
    return this.http.post(`http://localhost:8080/api/v1/boards/win`,{field:postData});
  }
}
