import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  personas: any = [];
  /* roles: string[]; */
  isMedical = false;
  isUser = false;

  constructor(private service: ServiceService,
    private tokenService: TokenService) { }

  ngOnInit() {
    /* this.roles = this.tokenService.getAuthorities(); */
    const roleUser = this.tokenService.getAuthoritiesUser();
    if (roleUser === 'ROLE_MEDICO') {
      this.isMedical = true;
      this.getPersons();
    } else if (roleUser === 'ROLE_USER') {
      this.isUser = true;
      this.getPersonByUsername();
    }
  }

  getPersons() {
    this.service.getPersonas().subscribe(
      res => {
        this.personas = res;
      },
      err => console.error(err)
    );
  }

  getPersonByUsername() {
    const params = sessionStorage.getItem('AuthUserName');
    this.service.getPersonaUser(params).subscribe((data: any) => {
      window.sessionStorage.setItem("userId", data.id);
    },
      err => console.log(err)
    );
  }
}
