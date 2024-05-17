import { Component, OnInit } from '@angular/core';
import { Paciente } from 'src/app/models/Paciente';
import { ServiceService } from 'src/app/services/service.service';
import { TokenService } from 'src/app/services/token.service';
import { HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-table-medicamentos',
  templateUrl: './table-medicamentos.component.html',
  styleUrls: ['./table-medicamentos.component.scss']
})
export class TableMedicamentosComponent implements OnInit {

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

  activeTab: string = 'Medication';
  Medicamento: any = [];
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

  onTabClick(tab) {
    this.activeTab = tab;
    this.dataMedication();
  }

  dataMedication(): void {
    const id = this.idUser;
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.tokenService.getToken());
    this.service.getmedicamentosPersonaId(id, headers).subscribe(data => {
      this.Medicamento = data;
    },
      err => console.log(err)
    );
  }

}
