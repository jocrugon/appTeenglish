import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Storage } from '@ionic/storage-angular';

const URL = environment.URL;


@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  constructor(
    private storage: Storage,
    private http:HttpClient,
  ) {this.storage.create();}

  /* Obtiene las categorías */
  async getCategories(){
    const token = await this.storage.get('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',`token ${token}`);
  
    return this.http.get(`${URL}/teenglish/category/`,{headers:headers});
  }
  /* Obtiene los ejercicios asignados a un estudiante de acuerdo a la categoría seleccionada */
  async getExercisesByCategoryByStudent( idCategory:number){
    const token = await this.storage.get('token');
    const idStudent = await this.storage.get('idStudent');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',`token ${token}`);
  
    return this.http.get(`${URL}/teenglish/exercise/category/${idStudent}/${idCategory}`,{headers:headers});
  }

  /* Obtiene un ejercicio por id */
  async getExerciseById(idExercise:number){
    const token = await this.storage.get('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',`token ${token}`);
  
    return this.http.get(`${URL}/teenglish/exercise/${idExercise}`,{headers:headers});
  }

  /* Cambia el estado del ejercicio a resuelto */
  async setSolvedInExerciseByCategoryAndStudent(id_detail:number){

    const token = await this.storage.get('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',`token ${token}`);

    const detail = {
      'is_solved':true,
    }

    return this.http.put(`${URL}/teenglish/exercise/detail/update/${id_detail}`,detail,{headers:headers})
    .subscribe(
      (data => console.log(data)),
      (error => console.log(error))
    );
  }
  /* Cambia el puntaje del alumno */
  async setNewValueInCurrentScore(scoreExercise:number){
    const token = await this.storage.get('token');
    const currentScore = await this.storage.get('current_score');
    const idStudent = await this.storage.get('idStudent');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',`token ${token}`);
    let sumScore = currentScore + scoreExercise;
    this.saveCurrentScore(sumScore);

    const student = {
      'current_score':sumScore,
    }

    return this.http.put(`${URL}/teenglish/student/update/${idStudent}`,student,{headers:headers})
    .subscribe(
      (data => console.log(data)),
      (error => console.log(error))
    );
  }
  /* Guarda el puntaje actual del alumno en local */
  async saveCurrentScore(current_score:number){
    await this.storage.set('current_score', current_score);
  }
}
