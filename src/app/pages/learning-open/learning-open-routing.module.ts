import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LearningOpenPage } from './learning-open.page';

const routes: Routes = [
  {
    path: '',
    component: LearningOpenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LearningOpenPageRoutingModule {}
