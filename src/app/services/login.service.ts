import { Injectable } from '@angular/core';
import { UiServiceService } from 'src/app/services/ui-service.service';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Storage } from '@ionic/storage-angular';
import { NavController } from '@ionic/angular';


const URL = environment.URL;

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  constructor(
    private storage: Storage,
    private http:HttpClient, 
    private uiService:UiServiceService,
    private navCtrl:NavController,
  ) { this.storage.create(); }

  login( username:string, password:string){
    const data = {username,password};
    return new Promise(resolve=>{
      this.http.post(`${URL}`, data)
      .subscribe(
        (data=>{
          this.saveDataAccount(
            data['token'],
            data['user']['id'],
            data['user']['name'],
            data['user']['last_name_p'],
            data['user']['last_name_m']);
          resolve(true);
        }),
        (error=>{
          this.storage.clear();
          this.showMessageSystem(error['status']);
          resolve(false);
        })
      ); 
    });


  }

  async saveDataAccount(token:string, idAccount:number, name:string, last_name_p:string, last_name_m:string){
    const completeName = (name+' '+last_name_p+' '+last_name_m);
    await this.storage.set('completeName', completeName);
    await this.storage.set('token', token);
    this.getStudent(idAccount,token);
  }

  showMessageSystem(status:number){
    if(status == 400){
      this.uiService.InformativeAlert('Usuario y/o Contraseña equivocada');
    }if(status == 409){
      this.uiService.InformativeAlert('Se accedió desde otro dispositivo, si fue usted ingrese nuevamente, en caso contrario comuniquese con el administrador');
    }
  }

  getStudent(idAccount:number,token:string){
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',`token ${token}`);
    return this.http.get(`${URL}/teenglish/student/${idAccount}`,{headers:headers})
            .subscribe(
              (data =>{
                this.saveDataStudent(data['avatar'],data['current_score'],data['id'])
              }),
              (error =>{console.log(error)}),
            );
  }

  async saveDataStudent(avatar:string, current_score:number, idStudent:number){
    await this.storage.set('avatar', avatar);
    await this.storage.set('current_score', current_score);
    await this.storage.set('idStudent', idStudent);
  }

  /* ---------------------------------------------------------------- */
  async logOut(){
    const token = await this.storage.get('token');
    this.http.get(`${URL}/logout/`,{
      params:{
        token
      }
    }).subscribe(
      (data => {
        this.storage.clear();
        this.uiService.InformativeAlert('Sesión cerrada');
        this.navCtrl.navigateRoot('/login',{animated:true});
      }),
      (error => {console.log(error)})
    )
  }

}
