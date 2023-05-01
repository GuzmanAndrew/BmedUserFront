import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LoginUsuario } from '../../models/login-usuario';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-login-medico',
  templateUrl: './login-medico.component.html',
  styleUrls: ['./login-medico.component.scss']
})
export class LoginMedicoComponent implements OnInit {

  isLogged = false;
  isLoginFail = false;
  loginUsuario: LoginUsuario;
  nombreUsuario: string;
  password: string;
  errMsj: string;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLoginFail = false;
    }
  }

  onLoginMedical(): void {
    this.loginUsuario = new LoginUsuario(this.nombreUsuario, this.password);
    this.authService.loginMedical(this.loginUsuario).subscribe(
      data => {
        this.isLogged = true;
        this.tokenService.setToken(data.token);
        this.tokenService.setUserName(this.nombreUsuario);
        this.tokenService.setAuthorities(data.authorities);
        this.router.navigate(['/dashboard']);
      },
      err => {
        this.isLogged = false;
        this.errMsj = err.error.message;
      }
    );
  }

}
