import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UsuarioGuard } from './guards/usuario.guard';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'instructions',
    pathMatch: 'full'
  },
  {
    path: 'main',
    loadChildren: () => import('./pages/main/main.module').then( m => m.MainPageModule),
    canLoad: [UsuarioGuard],
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'type1/:id/:id_detail',
    loadChildren: () => import('./pages/exercises/type1/type1.module').then( m => m.Type1PageModule),
  },
  {
    path: 'learning',
    loadChildren: () => import('./pages/learning/learning.module').then( m => m.LearningPageModule)
  },
  {
    path: 'learning-open',
    loadChildren: () => import('./pages/learning-open/learning-open.module').then( m => m.LearningOpenPageModule)
  },
  {
    path: 'type2/:id/:id_detail',
    loadChildren: () => import('./pages/exercises/type2/type2.module').then( m => m.Type2PageModule)
  },
  {
    path: 'instructions',
    loadChildren: () => import('./pages/instructions/instructions.module').then( m => m.InstructionsPageModule),
  
  },



  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
