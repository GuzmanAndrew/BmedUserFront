import { Injectable } from '@angular/core';
import { Paciente } from '../models/Paciente';
import { Covid } from '../models/Covid';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  Url = 'https://bmed-users-0af1bb387412.herokuapp.com/auth/findUsuarios';
  UrlByUserId = 'https://bmed-users-0af1bb387412.herokuapp.com/auth/usuario';
  UrlByUserName = 'https://bmed-users-0af1bb387412.herokuapp.com/auth/user/name';
  UrlByUserNameMedic = 'https://bmed-doctors-400d7407656f.herokuapp.com/auth/findMedico';
  urlPresionIdPatient = 'https://bmed-users-0af1bb387412.herokuapp.com/api/presion/user';
  urlAddCovid = 'https://bmed-users-0af1bb387412.herokuapp.com/api/covid/save';
  urlTemperaturaPatient = 'https://bmed-users-0af1bb387412.herokuapp.com/api/temp/user';
  urlOxigenoPatient = 'https://bmed-users-0af1bb387412.herokuapp.com/api/oxi/user';
  urlFrecuenciaturaPatient = 'https://bmed-users-0af1bb387412.herokuapp.com/api/frecuencia/user';
  urlCovidPatient = 'https://bmed-users-0af1bb387412.herokuapp.com/api/covid/user';
  urlpatologiaPatient = 'https://bmed-users-0af1bb387412.herokuapp.com/patologias/user';
  urlmedicamentosPatient = 'https://bmed-users-0af1bb387412.herokuapp.com/medicamentos/user';
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
  /* getPresionPersonaId(id: number, headers: HttpHeaders) {
    return this.http.get<any>(`${this.urlPresionIdPatient}/${id}`, { headers });
  } */
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
  getPatologiaPersonaId(id: number) {
    return this.http.get<any>(`${this.urlpatologiaPatient}/${id}`);
  }
  getmedicamentosPersonaId(id: number) {
    return this.http.get<any>(`${this.urlmedicamentosPatient}/${id}`);
  }


}
