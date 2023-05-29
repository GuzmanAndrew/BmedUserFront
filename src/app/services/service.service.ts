import { Injectable } from '@angular/core';
import { Paciente } from '../models/Paciente';
import { HttpClient } from '@angular/common/http';
import { Covid } from '../models/Covid';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  Url = 'http://bmed-user.us-east-1.elasticbeanstalk.com/auth/findUsuarios';
  UrlByUserId = 'http://bmed-user.us-east-1.elasticbeanstalk.com/auth/usuario';
  UrlByUserName = 'http://bmed-user.us-east-1.elasticbeanstalk.com/auth/user/name';
  UrlByUserNameMedic = 'http://bmed-medical.us-east-1.elasticbeanstalk.com/auth/findUsuario';
  urlPresionIdPatient = 'http://bmed-user.us-east-1.elasticbeanstalk.com/api/presion/user';
  urlAddCovid = 'http://bmed-user.us-east-1.elasticbeanstalk.com/api/covid/save';
  urlTemperaturaPatient = 'http://bmed-user.us-east-1.elasticbeanstalk.com/api/temp/user';
  urlOxigenoPatient = 'http://bmed-user.us-east-1.elasticbeanstalk.com/api/oxi/user';
  urlFrecuenciaturaPatient = 'http://bmed-user.us-east-1.elasticbeanstalk.com/api/frecuencia/user';
  urlCovidPatient = 'http://bmed-user.us-east-1.elasticbeanstalk.com/api/covid/user';

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
  getPresionPersonaId(id: number) {
    return this.http.get<any>(`${this.urlPresionIdPatient}/${id}`);
  }
  getTemperaturaPersonaId(id: number) {
    return this.http.get<any>(`${this.urlTemperaturaPatient}/${id}`);
  }
  getOxigenoPersonaId(id: number) {
    return this.http.get<any>(`${this.urlOxigenoPatient}/${id}`);
  }
  getFrecuenciaPersonaId(id: number) {
    return this.http.get<any>(`${this.urlFrecuenciaturaPatient}/${id}`);
  }
  getCovidPersonaId(id: number) {
    return this.http.get<any>(`${this.urlCovidPatient}/${id}`);
  }

}
