import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';

import { Storage } from '@ionic/storage-angular';
import { LoginService } from 'src/app/services/login.service';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})

export class MainPage implements OnInit {
  current_score = 0;
  token:string;


  constructor(
    private storage:Storage,
    private menu: MenuController,
    private loginService:LoginService,
    private router:Router,
    private navCtrl:NavController,


  ) { 
    this.storage.create();

  }

  async ngOnInit() {

    this.getToken2();

    this.menu.enable(true, 'first');
/*     setTimeout(() => {
      this.router.navigateByUrl('refresh', {skipLocationChange: true}).then(()=> this.router.navigate(['main']));
    }, 2000); */

    /* setInterval("location.reload()",1000); */


  }


  async getToken2(){
    const token = await this.storage.get('token');
    this.token = token;
  }


}
