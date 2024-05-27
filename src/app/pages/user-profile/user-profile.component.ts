import { Component, OnInit } from '@angular/core';
import { Paciente } from 'src/app/models/Paciente';
import { ServiceService } from 'src/app/services/service.service';
import { TokenService } from 'src/app/services/token.service';

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

  roles: string[];
  isMedical = false;
  isUser = false;

  constructor(private service: ServiceService,
    private tokenService: TokenService) { }

  ngOnInit() {
    const roleUser = this.tokenService.getAuthoritiesUser();
    if (roleUser === 'ROLE_MEDICO') {
      this.isMedical = true;
      this.loginMedic();
    } else if (roleUser === 'ROLE_USER') {
      this.isUser = true;
      this.loginUser();
    }
  }

  loginUser(): any {
    const params = sessionStorage.getItem('AuthUserName');
    this.service.getPersonaUser(params).subscribe((data: any) => {
      console.log(data);
      this.paciente = data;
    },
      err => console.log(err)
    );
  }

  loginMedic(): any {
    const params = sessionStorage.getItem('AuthUserName');
    this.service.getPersonaMedic(params).subscribe((data: any) => {
      console.log(data);
      this.paciente = data;
    },
      err => console.log(err)
    );
  }

}
