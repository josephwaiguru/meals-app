import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SchedulerPage } from './scheduler.page';

import { SchedulerPageRoutingModule } from './scheduler-routing.module';
import { AddComponent } from './add/add.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    ReactiveFormsModule,
    SchedulerPageRoutingModule
  ],
  declarations: [SchedulerPage, AddComponent]
})
export class SchedulerPageModule {}
