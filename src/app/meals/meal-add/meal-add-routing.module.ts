import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MealAddPage } from './meal-add.page';

const routes: Routes = [
  {
    path: '',
    component: MealAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MealAddPageRoutingModule {}
