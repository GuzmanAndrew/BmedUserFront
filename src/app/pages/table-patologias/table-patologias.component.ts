import { Component, OnInit } from '@angular/core';
import { Paciente } from 'src/app/models/Paciente';
import { ServiceService } from 'src/app/services/service.service';
import { TokenService } from 'src/app/services/token.service';
import { HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-table-patologias',
  templateUrl: './table-patologias.component.html',
  styleUrls: ['./table-patologias.component.scss']
})
export class TablePatologiasComponent implements OnInit {

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


  
  Patologia: any = [];
  p: number = 1;
  idUser: any;
  personas: any = [];
  roles: string[];

  constructor(private service:ServiceService,
    private activatedRouter:ActivatedRoute, private tokenService:TokenService) { }

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
    const params = this.activatedRouter.snapshot.params;
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

  dataPatology(): void {
    const id = this.idUser;
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.tokenService.getToken());
    this.service.getPatologiaPersonaId(id, headers).subscribe(data => {
      this.Patologia = data;
    },
      err => console.log(err)
    );
  }

  

}
