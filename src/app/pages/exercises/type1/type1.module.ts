import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Type1PageRoutingModule } from './type1-routing.module';

import { Type1Page } from './type1.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Type1PageRoutingModule,
    ComponentsModule
  ],
  declarations: [Type1Page]
})
export class Type1PageModule {}
