import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanLoad, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioGuard implements  CanLoad {

  constructor(
    private login:LoginService,
  ){

  }

  canLoad(): Observable<boolean> | Promise<boolean> | boolean{
    return this.login.validateToken();
  }
  
}
