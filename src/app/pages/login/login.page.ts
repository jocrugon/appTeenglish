import { Component, OnInit } from '@angular/core';

import { LoginService } from 'src/app/services/login.service';

import { NgForm } from '@angular/forms';
import { LoadingController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { UiServiceService } from 'src/app/services/ui-service.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  login_user = {
    username: '',
    password: ''
  };

  constructor(
    private loginService:LoginService, 
    private navCtrl:NavController,
    public loadingController: LoadingController,
    private uiService:UiServiceService,
    private storage: Storage,
  ) {this.storage.create(); }

  ngOnInit() {
  }

  async login(fLogin: NgForm){
    if (fLogin.invalid){
      this.uiService.InformativeAlert('Ingrese Usuario y/o Contraseña');
      return;
    }

    const is_valid = await this.loginService.login(this.login_user.username, this.login_user.password);
    
    if(is_valid){
      this.presentLoading();
      setTimeout(() => {
        this.navCtrl.navigateRoot('main',{animated:true});
      }, 3000);
      
    }else{
    }
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando ...',
      duration: 3000,
      mode: 'ios',

    });
    await loading.present();
  }


}
