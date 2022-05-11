import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MenuComponent } from './menu/menu.component';
import { ExercisesComponent } from './exercises/exercises.component';



@NgModule({
  declarations: [
    MenuComponent,
    ExercisesComponent,
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:[
    MenuComponent,
    ExercisesComponent
  ]
})
export class ComponentsModule { }
