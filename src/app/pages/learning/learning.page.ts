import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet, ModalController, NavController } from '@ionic/angular';

import { LearningService } from 'src/app/services/learning.service';
import { LearningOpenPage } from 'src/app/pages/learning-open/learning-open.page'
import { UiServiceService } from 'src/app/services/ui-service.service';

@Component({
  selector: 'app-learning',
  templateUrl: './learning.page.html',
  styleUrls: ['./learning.page.scss'],
})
export class LearningPage implements OnInit {

  listThemeLearning;
  
  constructor(
    private navCtrl:NavController,
    private learningService:LearningService,
    private modalCtrl:ModalController,
    public routerOutlet: IonRouterOutlet,
    private uiService:UiServiceService,
  ) { }

  async ngOnInit() {
    (await this.learningService.getLearningCategories())
      .subscribe(
        (data=>this.listThemeLearning = data),
        (error=>this.uiService.expiredToken())
      );
  }

  goHome(){
    this.navCtrl.navigateRoot('/main',{animated:true});
  }

  async openThemeLearning(idTheme:number){
    const modal = await this.modalCtrl.create({
      mode:'ios',
      component:LearningOpenPage,
      componentProps:{
        idTheme:idTheme
      },
      presentingElement: this.routerOutlet.nativeEl
    });
    await modal.present();
  }
}
