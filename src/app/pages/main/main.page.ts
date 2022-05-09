import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

import { Storage } from '@ionic/storage-angular';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})

export class MainPage implements OnInit {

  current_score = 0;

  constructor(
    private storage:Storage,
    private menu: MenuController,
    private data:DataService,

  ) { 
    this.storage.create();

  }

  ngOnInit() {
    this.data.getCurrent_score();
    this.data.getCurrent_score$().subscribe(data=> this.current_score = data);

    this.menu.enable(true, 'first');

  }


}
