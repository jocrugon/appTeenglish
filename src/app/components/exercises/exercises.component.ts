import { Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ExerciseService } from 'src/app/services/exercise.service';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss'],
})
export class ExercisesComponent implements OnInit {

  @Input() idCategorySelected;

  listExercises;
  constructor(
    private exercise:ExerciseService,
    private navCtrl:NavController,

  ) { }

  async ngOnChanges(){
    (await this.exercise.getExercisesByCategoryByStudent(this.idCategorySelected))
      .subscribe(data =>{ this.listExercises = data});
  }
  ngOnInit() {
    
  }

  OpenExercise(idTypeExercise:number, idExercise:number, id_detail:number ){
    
    switch(idTypeExercise){
      case 1:
        this.navCtrl.navigateRoot(`type1/${idExercise}/${id_detail}`);
        break;
      default:
        break;
      
    }
    
  }
}
