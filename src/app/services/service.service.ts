import { Injectable } from '@angular/core';
import { Paciente } from '../models/Paciente';
import { Covid } from '../models/Covid';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  Url = 'http://af1d8086a212344448cec34bbef1637a-1470802726.us-east-1.elb.amazonaws.com:8081/auth/findUsuarios';
  UrlByUserId = 'http://af1d8086a212344448cec34bbef1637a-1470802726.us-east-1.elb.amazonaws.com:8081/auth/usuario';
  UrlByUserName = 'http://af1d8086a212344448cec34bbef1637a-1470802726.us-east-1.elb.amazonaws.com:8081/auth/user/name';
  UrlByUserNameMedic = 'http://ab073dcc02b824e1099fa59323873364-133220988.us-east-1.elb.amazonaws.com:8083/auth/findUsuario';
  urlPresionIdPatient = 'http://af1d8086a212344448cec34bbef1637a-1470802726.us-east-1.elb.amazonaws.com:8081/api/presion/user';
  urlAddCovid = 'http://af1d8086a212344448cec34bbef1637a-1470802726.us-east-1.elb.amazonaws.com:8081/api/covid/save';
  urlTemperaturaPatient = 'http://af1d8086a212344448cec34bbef1637a-1470802726.us-east-1.elb.amazonaws.com:8081/api/temp/user';
  urlOxigenoPatient = 'http://af1d8086a212344448cec34bbef1637a-1470802726.us-east-1.elb.amazonaws.com:8081/api/oxi/user';
  urlFrecuenciaturaPatient = 'http://af1d8086a212344448cec34bbef1637a-1470802726.us-east-1.elb.amazonaws.com:8081/api/frecuencia/user';
  urlCovidPatient = 'http://af1d8086a212344448cec34bbef1637a-1470802726.us-east-1.elb.amazonaws.com:8081/api/covid/user';

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

}
