import { Injectable } from '@angular/core';
import { Paciente } from '../models/Paciente';
import { HttpClient } from '@angular/common/http';
import { Covid } from '../models/Covid';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  Url = 'http://localhost:8081/auth/findUsuarios';
  UrlByUserId = 'http://localhost:8081/auth/usuario';
  UrlByUserName = 'http://localhost:8081/auth/user/name';
  UrlByUserNameMedic = 'http://localhost:8083/auth/findUsuario';
  urlPresionIdPatient = 'http://localhost:8081/api/presion/user';
  urlAddCovid = 'http://localhost:8081/api/covid/save';
  urlTemperaturaPatient = 'http://localhost:8081/api/temp/user';
  urlOxigenoPatient = 'http://localhost:8081/api/oxi/user';
  urlFrecuenciaturaPatient = 'http://localhost:8081/api/frecuencia/user';
  urlCovidPatient = 'http://localhost:8081/api/covid/user';

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
