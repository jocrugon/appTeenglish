import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Storage } from '@ionic/storage-angular';

const URL = environment.URL;

@Injectable({
  providedIn: 'root'
})
export class LearningService {

  constructor(
    private http:HttpClient,
    private storage: Storage,

  ) {this.storage.create();}

  
  async getLearningCategories(){
    const token = await this.storage.get('token');

    let headers = new HttpHeaders();
    headers = headers.set('Authorization',`token ${token}`);

    return this.http.get(`${URL}/teenglish/learning/`,{headers:headers});
  }
  async getOptionsInTheme(idTheme:number){
    const token = await this.storage.get('token');

    let headers = new HttpHeaders();
    headers = headers.set('Authorization',`token ${token}`);
    return this.http.get(`${URL}/teenglish/learning/options/${idTheme}`,{headers:headers});

  }
}
