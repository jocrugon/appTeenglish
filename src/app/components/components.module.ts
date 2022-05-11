import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MenuComponent } from './menu/menu.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { SkeletonTextComponent } from './skeleton-text/skeleton-text.component';



@NgModule({
  declarations: [
    MenuComponent,
    ExercisesComponent,
    SkeletonTextComponent,
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:[
    MenuComponent,
    ExercisesComponent,
    SkeletonTextComponent,

  ]
})
export class ComponentsModule { }
