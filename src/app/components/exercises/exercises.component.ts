import { Component, Input, OnInit } from '@angular/core';
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

  ) { }

  async ngOnChanges(){
    (await this.exercise.getExercisesByCategoryByStudent(this.idCategorySelected))
      .subscribe(data =>{ this.listExercises = data});
  }
  ngOnInit() {
    
  }

  OpenExercise(idTypeExercise:number, idExercise:number, id_detail:number ){
    
    
  }
}
