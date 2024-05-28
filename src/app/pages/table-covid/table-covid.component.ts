import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Paciente } from 'src/app/models/Paciente';
import { ServiceService } from 'src/app/services/service.service';
import { TokenService } from 'src/app/services/token.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-table-covid',
  templateUrl: './table-covid.component.html',
  styleUrls: ['./table-covid.component.scss']
})
export class TableCovidComponent implements OnInit {

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

  roles: string[];
  covids: any = [];

  constructor(private service: ServiceService,
    private activatedRoute: ActivatedRoute, private tokenService: TokenService) { }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    this.service.getPersonaId(params.id).subscribe(data => {
      this.dataCovid(params.id);
      this.paciente = data;
    },
      err => console.log(err)
    );
  }

  dataCovid(id: number): void {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.tokenService.getToken());
    this.service.getCovidPersonaId(id, headers).subscribe(data => {
      this.covids = data;
    },
      err => console.log(err)
    );
  }

}
