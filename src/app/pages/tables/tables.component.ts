import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Paciente } from 'src/app/models/Paciente';
import { ServiceService } from 'src/app/services/service.service';
import { TokenService } from 'src/app/services/token.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {

  paciente: Paciente = {
    id: null,
    cedula: null,
    nombres: '',
    apellidos: '',
    edad: null,
    direccion: '',
    email: '',
    celular: '',
    password: ''
  };

  activeTab: string = 'Presions Arterial';
  temperaturas: any = [];
  presiones: any = [];
  oxigenos: any = [];
  frecuencias: any = [];
  p: number = 1;
  idUser: any;
  personas: any = [];
  roles: string[];

  constructor(private service: ServiceService,
    private activatedRoute: ActivatedRoute, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.roles = this.tokenService.getAuthorities();
    const roleUser = this.tokenService.getAuthoritiesUser();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_MEDICO') {
        this.getByUserId();
      }
    })
    if (roleUser === 'ROLE_USER') {
      this.getByUserName();
    }
  }

  getByUserId(): void {
    const params = this.activatedRoute.snapshot.params;
    this.service.getPersonaId(params.id).subscribe(data => {
      this.idUser = params.id;
      this.paciente = data;
    },
      err => console.log(err)
    );
  }

  getByUserName(): void {
    const params = sessionStorage.getItem('AuthUserName');
    this.service.getPersonaUser(params).subscribe((data: any) => {
      this.idUser = data.id;
      this.paciente = data;
    },
      err => console.log(err)
    );
  }

  onTabClick(tab) {
    this.activeTab = tab;
    this.dataTemperature();
    this.dataPresion();
    this.dataOxigeno();
    this.dataFrecuencia();
  }

  dataTemperature(): void {
    const id = this.idUser;
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.tokenService.getToken());
    this.service.getTemperaturaPersonaId(id, headers).subscribe(data => {
      this.temperaturas = data;
    },
      err => console.log(err)
    );
  }

  dataPresion(): void {
    const id = this.idUser;
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.tokenService.getToken());
    this.service.getPresionPersonaId(id, headers).subscribe(data => {
      this.presiones = data;
    },
      err => console.log(err)
    );
  }

  dataOxigeno(): void {
    const id = this.idUser;
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.tokenService.getToken());
    this.service.getOxigenoPersonaId(id, headers).subscribe(data => {
      this.oxigenos = data;
    },
      err => console.log(err)
    );
  }

  dataFrecuencia(): void {
    const id = this.idUser;
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.tokenService.getToken());
    this.service.getFrecuenciaPersonaId(id, headers).subscribe(data => {
      console.log("DATA: " + data);
      this.frecuencias = data;
    },
      err => console.log(err)
    );
  }

}
