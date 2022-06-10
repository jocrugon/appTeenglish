import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { NavController } from '@ionic/angular';
import { ExerciseService } from 'src/app/services/exercise.service';
import { UiServiceService } from 'src/app/services/ui-service.service';

@Component({
  selector: 'app-type2',
  templateUrl: './type2.page.html',
  styleUrls: ['./type2.page.scss'],
})
export class Type2Page implements OnInit {

  idExercise:number;
  idDetailExercise:number;
  exercise = {};
  listOptions;
  
  buttonPressed = false;

  /* control del ejercicio */
  selectedOptionValue:boolean;/* para ver si se seleccionó una opción o no */
  check_button_pressed:boolean = false; /* para ver si se presiona el botón de verificar */


  constructor(
    private activatedRoute:ActivatedRoute,
    private exerciseService:ExerciseService,
    private navCtrl:NavController,
    private uiService:UiServiceService,
    private tts:TextToSpeech
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
        this.uiService.expiredToken();
      })
      );
  }
  getOptionSelected($event){
    let idOptionSelected = $event.detail.value;
    this.listOptions.forEach(element =>{
      if(element['id'] == idOptionSelected){
        if(element['is_correct']){
          this.selectedOptionValue =  true;
        }else{
          this.selectedOptionValue =  false;
          
        }
      }
    });
  }
  checkOption(){
    
    if(this.selectedOptionValue == undefined){
      this.uiService.InformativeAlert("Elija una opción");

    }else if(this.selectedOptionValue){
      //respuesta correcta
      this.check_button_pressed = true;

      this.exerciseService.setSolvedInExerciseByCategoryAndStudent(this.idDetailExercise);
      this.exerciseService.setNewValueInCurrentScore(this.exercise['score']);
    }else{
      this.check_button_pressed = true;

    }
  }

  goHome(){
    this.navCtrl.navigateRoot('/main',{animated:true});
  }
  
  remakeExercise(){
    this.check_button_pressed = false;

  }
  playPhrase(phrase:string){
    this.tts.speak({
      text:phrase,
      locale:'en-US',
      rate:1
    })
    .then(()=>console.log('succes'))
    .catch((reason:any)=>console.log(reason));
  }
}
