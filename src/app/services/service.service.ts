import { Injectable } from '@angular/core';
import { Paciente } from '../models/Paciente';
import { Covid } from '../models/Covid';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  Url = 'http://a54be33b1ce9e4e4cbb4872ede1edd1f-1144256451.us-east-1.elb.amazonaws.com:8081/auth/findUsuarios';
  UrlByUserId = 'http://a54be33b1ce9e4e4cbb4872ede1edd1f-1144256451.us-east-1.elb.amazonaws.com:8081/auth/usuario';
  UrlByUserName = 'http://a54be33b1ce9e4e4cbb4872ede1edd1f-1144256451.us-east-1.elb.amazonaws.com:8081/auth/user/name';
  UrlByUserNameMedic = 'http://ab073dcc02b824e1099fa59323873364-133220988.us-east-1.elb.amazonaws.com:8083/auth/findUsuario';
  urlPresionIdPatient = 'http://a54be33b1ce9e4e4cbb4872ede1edd1f-1144256451.us-east-1.elb.amazonaws.com:8081/api/presion/user';
  urlAddCovid = 'http://a54be33b1ce9e4e4cbb4872ede1edd1f-1144256451.us-east-1.elb.amazonaws.com:8081/api/covid/save';
  urlTemperaturaPatient = 'http://a54be33b1ce9e4e4cbb4872ede1edd1f-1144256451.us-east-1.elb.amazonaws.com:8081/api/temp/user';
  urlOxigenoPatient = 'http://a54be33b1ce9e4e4cbb4872ede1edd1f-1144256451.us-east-1.elb.amazonaws.com:8081/api/oxi/user';
  urlFrecuenciaturaPatient = 'http://a54be33b1ce9e4e4cbb4872ede1edd1f-1144256451.us-east-1.elb.amazonaws.com:8081/api/frecuencia/user';
  urlCovidPatient = 'http://a54be33b1ce9e4e4cbb4872ede1edd1f-1144256451.us-east-1.elb.amazonaws.com:8081/api/covid/user';
  urlpatologiaPatient = 'http://backend-users.us-east-1.elasticbeanstalk.com/patologias/user';
  urlmedicamentosPatient = 'http://backend-users.us-east-1.elasticbeanstalk.com/patologias/user';
  constructor(private http: HttpClient) { }

  getPersonas() {
    return this.http.get(`${this.Url}`);
  }
  getPersonaId(id: number) {
    return this.http.get(`${this.UrlByUserId}/${id}`);
  }
  getPersonaUser(usuario: string) {
    return this.http.get(`${this.UrlByUserName}/${usuario}`);
  }
  getPersonaMedic(usuario: string) {
    return this.http.get(`${this.UrlByUserNameMedic}/${usuario}`);
  }
  savedCovid(covid: Covid) {
    return this.http.post(`${this.urlAddCovid}`, covid);
  }
  updatePersona(id: string | number, updatePersona: Paciente) {
    return this.http.put(`${this.Url}/${id}`, updatePersona);
  }

  // DATA PATIENT
  getPresionPersonaId(id: number, headers: HttpHeaders) {
    return this.http.get<any>(`${this.urlPresionIdPatient}/${id}`, { headers });
  }
  getTemperaturaPersonaId(id: number, headers: HttpHeaders) {
    return this.http.get<any>(`${this.urlTemperaturaPatient}/${id}`, { headers });
  }
  getOxigenoPersonaId(id: number, headers: HttpHeaders) {
    return this.http.get<any>(`${this.urlOxigenoPatient}/${id}`, { headers });
  }
  getFrecuenciaPersonaId(id: number, headers: HttpHeaders) {
    return this.http.get<any>(`${this.urlFrecuenciaturaPatient}/${id}`, { headers });
  }
  getCovidPersonaId(id: number) {
    return this.http.get<any>(`${this.urlCovidPatient}/${id}`);
  }
  getPatologiaPersonaId(id: number, headers: HttpHeaders) {
    return this.http.get<any>(`${this.urlpatologiaPatient}/${id}`,{ headers });
  }
  getmedicamentosPersonaId(id: number, headers: HttpHeaders) {
    return this.http.get<any>(`${this.urlmedicamentosPatient}/${id}`,{ headers });
  }


}
