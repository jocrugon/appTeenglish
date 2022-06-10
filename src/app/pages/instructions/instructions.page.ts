import { Component, OnInit } from '@angular/core';
import { App } from '@capacitor/app';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.page.html',
  styleUrls: ['./instructions.page.scss'],
})
export class InstructionsPage implements OnInit {
  
  slides: { img: string, titulo: string, desc: string }[] = [
    {
      img: '/assets/slides/aprende.png',
      titulo: 'Aprende',
      desc: 'Aprende nuevas palabras de manera dinámica'
    },
    {
      img: '/assets/slides/cup.png',
      titulo: 'Puntaje',
      desc: 'Controla tu avance con puntaje obtenido por tu dedicación'
    },
    {
      img: '/assets/slides/categories.png',
      titulo: 'Categorías',
      desc: 'Aprende temas puntuales divididos por categorías'
    },
    {
      img: '/assets/slides/calendar.svg',
      titulo: 'Decide',
      desc: 'Aprende y resuelve ejercicios a tu ritmo'
    }
  ];
  constructor(
    private navCtrl:NavController,
    private storage: Storage,

  ) {
    this.storage.create();

   }

  async ngOnInit() {
    const token = await this.storage.get('token');
    if(token){
      this.navCtrl.navigateRoot('main',{animated:true});
    }
  }
  
  goLogin(){
    this.navCtrl.navigateRoot('login',{animated:true});
  }

  exitApplication(){
    /* por comprobar en un emulador movil */
    App.exitApp();
  }
}
