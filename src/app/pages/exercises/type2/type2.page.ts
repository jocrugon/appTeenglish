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
  
  /* control del ejercicio */
  selectedOptionValue:boolean;/* para ver si se seleccionó una opción o no */

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
    if(this.selectedOptionValue){
      console.log("respuesta correcta");
    }else{
      console.log("respuesta incorrecta");
    }
  }

  goHome(){
    this.navCtrl.navigateRoot('/main',{animated:true});
  }
  
}
