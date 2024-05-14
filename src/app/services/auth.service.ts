import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginUsuario } from '../models/login-usuario';
import { JwtDTO } from '../models/jwt-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authURL = 'http://af1d8086a212344448cec34bbef1637a-1470802726.us-east-1.elb.amazonaws.com:8081/auth/';
  authMedicalURL = 'http://ab073dcc02b824e1099fa59323873364-133220988.us-east-1.elb.amazonaws.com:8083/auth/';

  constructor(private httpClient: HttpClient) { }

  public login(loginUsuario: LoginUsuario): Observable<JwtDTO> {
    return this.httpClient.post<JwtDTO>(this.authURL + 'login', loginUsuario);
  }

  public loginMedical(loginUsuario: LoginUsuario): Observable<JwtDTO> {
    return this.httpClient.post<JwtDTO>(this.authMedicalURL + 'login', loginUsuario);
  }

}
