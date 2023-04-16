import { Component, OnInit } from '@angular/core';
import { Paciente } from 'src/app/models/Paciente';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

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

  constructor(private service: ServiceService) { }

  ngOnInit() {
    const params = sessionStorage.getItem('AuthUserName');
    this.service.getPersonaId(params).subscribe((data: any) => {
      console.log(data);
      this.paciente = data;
    },
    err => console.log(err)
    );
  }

}
