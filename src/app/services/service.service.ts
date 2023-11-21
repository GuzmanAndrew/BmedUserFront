import { Injectable } from '@angular/core';
import { Paciente } from '../models/Paciente';
import { Covid } from '../models/Covid';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  Url = 'http://backend-users.us-east-1.elasticbeanstalk.com/auth/findUsuarios';
  UrlByUserId = 'http://backend-users.us-east-1.elasticbeanstalk.com/auth/usuario';
  UrlByUserName = 'http://backend-users.us-east-1.elasticbeanstalk.com/auth/user/name';
  UrlByUserNameMedic = 'http://bmed-medical.us-east-1.elasticbeanstalk.com/auth/findUsuario';
  urlPresionIdPatient = 'http://backend-users.us-east-1.elasticbeanstalk.com/api/presion/user';
  urlAddCovid = 'http://backend-users.us-east-1.elasticbeanstalk.com/api/covid/save';
  urlTemperaturaPatient = 'http://backend-users.us-east-1.elasticbeanstalk.com/api/temp/user';
  urlOxigenoPatient = 'http://backend-users.us-east-1.elasticbeanstalk.com/api/oxi/user';
  urlFrecuenciaturaPatient = 'http://backend-users.us-east-1.elasticbeanstalk.com/api/frecuencia/user';
  urlCovidPatient = 'http://backend-users.us-east-1.elasticbeanstalk.com/api/covid/user';

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
