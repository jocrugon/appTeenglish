import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Type2Page } from './type2.page';

const routes: Routes = [
  {
    path: '',
    component: Type2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Type2PageRoutingModule {}
