import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { MealsService } from 'src/app/services/meals.service';
import { SchedulerService } from 'src/app/services/scheduler.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {

  @Input() category;

  @Input() date;

  @Input() meal;

  meals: any = [];

  filteredMeals: any = [];

  searchField: FormControl;

  constructor(private mealsService: MealsService, private modalCtrl: ModalController, private schedulerService: SchedulerService) { }

  ngOnInit() {
    this.searchField = new FormControl();
    this.filteredMeals = this.meals;
  }

  getMeals() {
    this.mealsService.getAll().subscribe(res => this.meals = res.data.filter(meal =>
      meal.categories.some(cat => cat.id === this.category)));
  }

  onSearch(e) {
    const term = e.target.value;

    this.filteredMeals = this.meals.filter(meal => meal.name.toLowerCase().includes(term.toLowerCase()));
  }

  onSelect(meal) {
    this.schedulerService.create({ category: this.category, schedule_date: this.date, meals: [meal] }).subscribe(res => {
      this.modalCtrl.dismiss({ dismissed: true });
    });
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
