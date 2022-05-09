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

  
  async getCategories(){
    const token = await this.storage.get('token');

    let headers = new HttpHeaders();
    headers = headers.set('Authorization',`token ${token}`);
  
    return this.http.get(`${URL}/teenglish/category/`,{headers:headers});

  }
}
