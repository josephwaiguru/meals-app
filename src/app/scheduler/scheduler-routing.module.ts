import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchedulerPage } from './scheduler.page';

const routes: Routes = [
  {
    path: '',
    component: SchedulerPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchedulerPageRoutingModule {}
