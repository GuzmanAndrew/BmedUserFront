import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AlgorithmsIaService {

  constructor(private http: HttpClient) { }

  public post(url:string, body){
    return this.http.post(url, body);
  }

}
