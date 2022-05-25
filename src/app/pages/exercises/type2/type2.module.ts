import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Type2PageRoutingModule } from './type2-routing.module';

import { Type2Page } from './type2.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Type2PageRoutingModule,
    ComponentsModule

  ],
  declarations: [Type2Page]
})
export class Type2PageModule {}
