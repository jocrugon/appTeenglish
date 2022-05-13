import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LearningPageRoutingModule } from './learning-routing.module';

import { LearningPage } from './learning.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LearningPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [LearningPage]
})
export class LearningPageModule {}
