import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';

import { Storage } from '@ionic/storage-angular';
import { DataService } from 'src/app/services/data.service';
import { ExerciseService } from 'src/app/services/exercise.service';
import { LoginService } from 'src/app/services/login.service';
import { UiServiceService } from 'src/app/services/ui-service.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  @Output() clickCategory = new EventEmitter();
  listCategories;
  completeName = "error";
  avatar = 'dfImage.jpg';
  idCategorySelected = 1;

  constructor(
    private loginService:LoginService,
    private storage: Storage,
    private menu: MenuController,
    private data:DataService,
    private exercise:ExerciseService,
    private navCtrl:NavController,
    private uiService:UiServiceService
  ) 
  { this.storage.create(); }

  async ngOnInit() {
    this.data.getCompleteName();
    this.data.getCompleteName$().subscribe(data => this.completeName = data);
    this.data.getAvatar();
    this.data.getAvatar$().subscribe(data => this.avatar = data);
    (await this.exercise.getCategories())
    .subscribe( data =>{this.listCategories = data});
    
  }


  logOut(){
    this.loginService.logOut();
    this.storage.clear();
    this.menu.enable(false, 'first');
  }


  categorySelected(idCategorySelected:number){
    if(this.idCategorySelected == idCategorySelected){
      this.activateClassSelected(this.idCategorySelected)
    }else{
      this.deactivateClassSelected(this.idCategorySelected);
      this.activateClassSelected(idCategorySelected);
    }

    this.idCategorySelected = idCategorySelected;

    this.clickCategory.emit(idCategorySelected);
    
  }
  
  activateClassSelected(idCategorySelected:number){
    var categorySelected = document.getElementById(`${idCategorySelected}`);
    categorySelected.classList.add("active");
  }
  deactivateClassSelected(idCategorySelected:number){
    var categorySelected = document.getElementById(`${idCategorySelected}`);
    categorySelected.classList.remove("active");
  }
  openLearning(){
    this.navCtrl.navigateRoot('learning',{animated:true});
  }
  
  openAbout(){
    this.uiService.InformativeAlert("Desarrollado con fines de estudios por estudiantes de la Universidad César Vallejo de la Carrera Ingeniería de Sistemas {José Darío Gonzalez Cruz, Franky Yerdin Jimenez Garcia}");
  }
}
