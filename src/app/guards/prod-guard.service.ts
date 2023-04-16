import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class ProdGuardService implements CanActivate {

  realRol: string;
  flag: boolean;

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot) {
    const expectedRol = route.data.expectedRol;
    if (!this.tokenService.getToken()) {
      this.router.navigate(['/']);
      return false;
    }
    return true
  }

}
