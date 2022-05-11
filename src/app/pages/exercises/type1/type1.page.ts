import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ExerciseService } from 'src/app/services/exercise.service';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { environment } from 'src/environments/environment.prod';

const URLimages = environment.URLimages;

@Component({
  selector: 'app-type1',
  templateUrl: './type1.page.html',
  styleUrls: ['./type1.page.scss'],
})
export class Type1Page implements OnInit {
  imgRoute = URLimages;
  idExercise:number;
  idDetailExercise:number;
  exercise = {};
  listOptions;

  /* control del ejercicio */
  selectedOptionValue:boolean;/* para ver si se seleccionó una opción o no */
  check_button_pressed:boolean = false; /* para ver si se presiona el botón de verificar */
  
  constructor(
    private activatedRoute:ActivatedRoute,
    private exerciseService:ExerciseService,
    private navCtrl:NavController,
    private uiService:UiServiceService,
  ) { }

  async ngOnInit() {
    this.idExercise = this.activatedRoute.snapshot.params.id;
    this.idDetailExercise = this.activatedRoute.snapshot.params.id_detail;

    (await this.exerciseService.getExerciseById(this.idExercise))
    .subscribe( 
      (data =>{
      this.exercise = data['exercise'];
      this.listOptions = data['options'];
      }),
      (error =>{
        this.uiService.InformativeAlert("Se accedió desde otro dispositivo, si fue usted ingrese nuevamente, en caso contrario comuníquese con el administrador");
        this.navCtrl.navigateRoot('login',{animated:true});
      })
      );
 
    

  }

  optionSelected(position:number, value:boolean){
    this.changeColorOptionSelected(position);
    this.selectedOptionValue = value;
  }

  changeColorOptionSelected(position:number){
  
    let option1='option'+this.listOptions[0]['id'];
    let option2='option'+this.listOptions[1]['id'];
    let color = 'rgb(93, 156, 207)';

    if(position == 0){
      document.getElementById(option1).style.backgroundColor  = color;
      document.getElementById(option2).style.backgroundColor  = '';
    }else{
      document.getElementById(option2).style.backgroundColor  = color;
      document.getElementById(option1).style.backgroundColor  = '';
      
    }
  }
  checkOption(){

    if(this.selectedOptionValue == undefined){
      console.log("elegir una opción p bandido");
    }else{
      this.check_button_pressed = true;
      if(this.selectedOptionValue){
        this.selectedOptionValue = true;
        this.exerciseService.setSolvedInExerciseByCategoryAndStudent(this.idDetailExercise);
        this.exerciseService.setNewValueInCurrentScore(this.exercise['score']);
      }else{
        this.selectedOptionValue = false;
      }
    }
  }
  /* button footer */
  goHome(){
    this.navCtrl.navigateRoot('/main',{animated:true});
  }
  

  remakeExercise(){
    this.check_button_pressed = false;

  }
}
