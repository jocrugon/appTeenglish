import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LearningOpenPageRoutingModule } from './learning-open-routing.module';

import { LearningOpenPage } from './learning-open.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LearningOpenPageRoutingModule
  ],
  declarations: [LearningOpenPage]
})
export class LearningOpenPageModule {}
