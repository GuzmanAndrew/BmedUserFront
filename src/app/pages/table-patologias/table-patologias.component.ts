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

  patologias: any = [];
  p: number = 1;
  personas: any = [];
  roles: string[];

  constructor(private service: ServiceService,
    private activatedRouter: ActivatedRoute, private tokenService: TokenService) { }

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
    this.dataPatology();
  }

  getByUserId(): void {
    const params = this.activatedRouter.snapshot.params;
    this.service.getPersonaId(params.id).subscribe(data => {
      this.paciente = data;
    },
      err => console.log(err)
    );
  }

  getByUserName(): void {
    const params = sessionStorage.getItem('AuthUserName');
    this.service.getPersonaUser(params).subscribe((data: any) => {
      this.paciente = data;
    },
      err => console.log(err)
    );
  }

  dataPatology(): void {
    const token = this.tokenService.getToken();
    const id = sessionStorage.getItem('userId');
    const idNumber = parseInt(id, 10);

    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    console.log("Headers: ", headers);

    this.service.getPatologiaPersonaId(idNumber, headers).subscribe(
      data => {
        console.log("Response Data: ", data);
        this.patologias = data;
      },
      err => {
        console.error("Error: ", err);
      }
    );
  }

}
