import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

import { Storage } from '@ionic/storage-angular';
import { DataService } from 'src/app/services/data.service';
import { ExerciseService } from 'src/app/services/exercise.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  listCategories;
  completeName;
  avatar = 'dfImage.jpg';
  token:string = "aún no se carga";

  constructor(
    private loginService:LoginService,
    private storage: Storage,
    private menu: MenuController,
    private data:DataService,
    private exercise:ExerciseService,

  ) 
  { this.storage.create();}

  async ngOnInit() {
    this.data.getToken();
    this.data.getToken$().subscribe(data=> this.token = data);
    (await this.exercise.getCategories())
    .subscribe( data =>{this.listCategories = data});
     
  }

  LogOut(){

    this.loginService.logOut();
    this.storage.clear();
    this.menu.enable(false, 'first');
    

  }
}
