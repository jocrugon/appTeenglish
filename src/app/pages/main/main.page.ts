import { Component, OnInit } from '@angular/core';

import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  token:string = '0';
  constructor(
    private storage:Storage,

  ) { }

  async ngOnInit() {
    const token = await this.storage.get('token');
    this.token = token;
  }

}
