import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ModalController } from '@ionic/angular';
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

  @Input() meals: any = [];

  filteredMeals: any = [];

  searchField: FormControl;

  constructor(private modalCtrl: ModalController, private schedulerService: SchedulerService) { }

  ngOnInit() {
    this.searchField = new FormControl();
    this.filteredMeals = this.meals;
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
