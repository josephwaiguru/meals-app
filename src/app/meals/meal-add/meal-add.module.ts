import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MealAddPageRoutingModule } from './meal-add-routing.module';

import { MealAddPage } from './meal-add.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    MealAddPageRoutingModule
  ],
  declarations: [MealAddPage]
})
export class MealAddPageModule {}
