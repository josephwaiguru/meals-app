import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MealsPage } from './meals.page';

const routes: Routes = [
  {
    path: '',
    component: MealsPage,
  },
  {
    path: 'meal-add',
    loadChildren: () => import('./meal-add/meal-add.module').then( m => m.MealAddPageModule)
  },
  {
    path: 'meal-edit/:id',
    loadChildren: () => import('./meal-add/meal-add.module').then( m => m.MealAddPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MealsPageRoutingModule {}
