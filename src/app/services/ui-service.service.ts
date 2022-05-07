import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiServiceService {

  constructor(public alertController: AlertController) {}

  async InformativeAlert(message:string) {
    const alert = await this.alertController.create({
      header: 'Mensaje de error',
      message,
      mode:'ios',
      buttons: ['OK']
    });

    await alert.present();

  }
}
