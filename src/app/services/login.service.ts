import { Injectable } from '@angular/core';
import { UiServiceService } from 'src/app/services/ui-service.service';

import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Storage } from '@ionic/storage-angular';
import { NavController } from '@ionic/angular';


const URL = environment.URL;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  token = null


  constructor(
    private storage: Storage,
    private http:HttpClient, 
    private uiService:UiServiceService,

  ) { this.storage.create(); }

  login( username:string, password:string){
    const data = {username,password};

    return new Promise(resolve=>{
      this.http.post(`${URL}`, data)
      .subscribe(
        (data=>{
          this.saveData(
            data['token'],
            data['user']['id'],
            data['user']['name'],
            data['user']['last_name_p'],
            data['user']['last_name_m']);
          resolve(true);
        }),
        (error=>{
          this.token = null;
          this.storage.clear();
          this.showMessageSystem(error['status']);
          resolve(false);
        })
      ); 
    });


  }
  async saveData(token:string, idAccount:number, name:string, last_name_p:string, last_name_m:string){
    const completeName = (name+' '+last_name_p+' '+last_name_m);
    this.token = token;
    await this.storage.set('token', token);
    await this.storage.set('idAccount', idAccount);
    await this.storage.set('completeName', completeName);
  }
  showMessageSystem(status:number){
    if(status == 400){
      this.uiService.InformativeAlert('Usuario y/o Contraseña equivocada');
    }if(status == 409){
      this.uiService.InformativeAlert('Se accedió desde otro dispositivo, si fue usted ingrese nuevamente, en caso contrario comuniquese con el administrador');
    }
  }

}
