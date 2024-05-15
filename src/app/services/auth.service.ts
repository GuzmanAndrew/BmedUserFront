import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginUsuario } from '../models/login-usuario';
import { JwtDTO } from '../models/jwt-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authURL = 'http://a54be33b1ce9e4e4cbb4872ede1edd1f-1144256451.us-east-1.elb.amazonaws.com:8081/auth/';
  authMedicalURL = 'http://ab073dcc02b824e1099fa59323873364-133220988.us-east-1.elb.amazonaws.com:8083/auth/';

  constructor(private httpClient: HttpClient) { }

  public login(loginUsuario: LoginUsuario): Observable<JwtDTO> {
    return this.httpClient.post<JwtDTO>(this.authURL + 'login', loginUsuario);
  }

  public loginMedical(loginUsuario: LoginUsuario): Observable<JwtDTO> {
    return this.httpClient.post<JwtDTO>(this.authMedicalURL + 'login', loginUsuario);
  }

}
