import { Injectable } from '@angular/core';
import { Paciente } from '../models/Paciente';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  Url = 'http://localhost:8081/auth/findUsuarios';
  UrlByUserPatient = 'http://localhost:8081/auth/usuario';
  urlPresionIdPatient = 'http://localhost:8081/api/presion/user';
  urlTemperaturaPatient = 'http://localhost:8081/api/temp/user';
  urlOxigenoPatient = 'http://localhost:8081/api/oxi/user';
  urlFrecuenciaturaPatient = 'http://localhost:8081/api/frecuencia/user';

  constructor(private http: HttpClient) { }

  getPersonas() {
    return this.http.get(`${this.Url}`);
  }

  getPersonaId(usuario: string) {
    return this.http.get(`${this.UrlByUserPatient}/${usuario}`);
  }

  deletePersona(id: number) {
    return this.http.delete(`${this.Url}/${id}`);
  }

  createPersona(persona: Paciente) {
    return this.http.post(`${this.Url}`, persona);
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

}
