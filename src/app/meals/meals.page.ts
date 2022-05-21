import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MealsService } from '../services/meals.service';

@Component({
  selector: 'app-meals',
  templateUrl: 'meals.page.html',
  styleUrls: ['meals.page.scss']
})
export class MealsPage {

  meals: Array<any> = [];

  filteredMeals: Array<any> = [];

  searchVisible: boolean;

  constructor(private mealsService: MealsService, private router: Router) {}

  ionViewWillEnter() {
    this.getMeals();
  }

  getMeals() {
    this.mealsService.getAll().subscribe(res => {
      this.meals = res.data;
      this.filteredMeals = this.meals;
    });
  }

  addMeal() {
    this.router.navigateByUrl('/tabs/meals/meal-add');
  }

  toggleSearch(visible) {
    // this.searchVisible = visible;
  }

  onSearch(e) {
    const term = e.target.value;

    this.filteredMeals = this.meals.filter(meal => meal.name.toLowerCase().includes(term.toLowerCase()));
  }
}
