import { Injectable } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiServiceService {

  constructor(
    public alertController: AlertController,
    public navCtrl:NavController,
    ) {}

  async InformativeAlert(message:string) {
    const alert = await this.alertController.create({
      header: 'Mensaje',
      message,
      mode:'ios',
      buttons: ['OK']
    });

    await alert.present();

  }
  expiredToken(){
    this.InformativeAlert("Se accedió desde otro dispositivo, si fue usted ingrese nuevamente, en caso contrario comuníquese con el administrador");
    this.navCtrl.navigateRoot('login',{animated:true});
  }
}
