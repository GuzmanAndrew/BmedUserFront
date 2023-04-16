import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Paciente } from 'src/app/models/Paciente';
import { ServiceService } from 'src/app/services/service.service';

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

  constructor(private service: ServiceService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const params = sessionStorage.getItem('AuthUserName');
    this.service.getPersonaId(params).subscribe((data: any) => {
      console.log(data);
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
    this.service.getTemperaturaPersonaId(id).subscribe(data => {
      console.log(data);
      this.temperaturas = data;
    },
    err => console.log(err)
    );
  }

  dataPresion(): void {
    const id = this.idUser;
    this.service.getPresionPersonaId(id).subscribe(data => {
      console.log(data);
      this.presiones = data;
    },
    err => console.log(err)
    );

  }

  dataOxigeno(): void {
    const id = this.idUser;
    this.service.getOxigenoPersonaId(id).subscribe(data => {
      console.log(data);
      this.oxigenos = data;
    },
    err => console.log(err)
    );
  }

  dataFrecuencia(): void {
    const id = this.idUser;
    this.service.getFrecuenciaPersonaId(id).subscribe(data => {
      console.log(data);
      this.frecuencias = data;
    },
    err => console.log(err)
    );
  }

}
