import { Component, Input, OnInit } from '@angular/core';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { ModalController } from '@ionic/angular';

import { LearningService } from 'src/app/services/learning.service';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { environment } from 'src/environments/environment.prod';

const URLimages = environment.URLimages;

@Component({
  selector: 'app-learning-open',
  templateUrl: './learning-open.page.html',
  styleUrls: ['./learning-open.page.scss'],
})
export class LearningOpenPage implements OnInit {

  @Input() idTheme:number;
  
  imgRoute = URLimages;
  listOptionsInTheme;
  constructor(
    private modalCtrl:ModalController,
    private learningService:LearningService,
    private uiService:UiServiceService,
    private tts:TextToSpeech,

  ) { }

  async ngOnInit() {
    (await this.learningService.getOptionsInTheme(this.idTheme))
      .subscribe(
        (data => {this.listOptionsInTheme = data;}),
        (error => {
          this.uiService.expiredToken();
          this.modalCtrl.dismiss();
        })
      );
  }
  closeModal(){
    this.modalCtrl.dismiss();
  }
  playOption(option:string){
    this.voiceBot(option,1);
  }
  playOptionSlow(option:string){
    this.voiceBot(option,0.5);
  }

  voiceBot(text:string, rate:number){
    this.tts.speak({
      text,
      locale:'en-US',
      rate,
    })
    .then(()=>console.log('succes'))
    .catch((reason:any)=>console.log(reason));
  }
}
