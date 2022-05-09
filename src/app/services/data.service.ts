import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {  
  private token$: Subject<string>;
  private completeName$: Subject<string>;
  private avatar$: Subject<string>;
  private current_score$: Subject<string>;
  private idStudent$: Subject<string>;

  constructor(
    private storage: Storage,

  ) {
    this.storage.create();
  }

  async getToken(){
    this.token$ = new Subject();
    const token = await this.storage.get('token');
    this.token$.next(token);
  }
  async getCompleteName(){
    this.completeName$ = new Subject();
    const completeName = await this.storage.get('completeName');
    this.completeName$.next(completeName);
  }
  async getAvatar(){
    this.avatar$ = new Subject();
    const avatar = await this.storage.get('avatar');
    this.avatar$.next(avatar);
  }
  async getCurrent_score(){
    this.current_score$ = new Subject();
    const current_score = await this.storage.get('current_score');
    this.current_score$.next(current_score);
  }
  async getIdStudent(){
    this.idStudent$ = new Subject();
    const idStudent = await this.storage.get('idStudent');
    this.idStudent$.next(idStudent);
  }

  /* return data in observable */
  getToken$():Observable<string>{
    return this.token$.asObservable();
  }
  getCompleteName$():Observable<string>{
    return this.completeName$.asObservable();
  }
  getAvatar$():Observable<string>{
    return this.avatar$.asObservable();
  }
  getCurrent_score$():Observable<string>{
    return this.current_score$.asObservable();
  }
  getIdStudent$():Observable<string>{
    return this.idStudent$.asObservable();
  }


}
