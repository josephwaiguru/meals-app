import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MealsService } from 'src/app/services/meals.service';

@Component({
  selector: 'app-meal-add',
  templateUrl: './meal-add.page.html',
  styleUrls: ['./meal-add.page.scss'],
})
export class MealAddPage implements OnInit {

  categories: Array<any> = [];

  mealForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    categories: new FormControl('', Validators.required),
    description: new FormControl('')
  });

  categoryId: string;

  defaultCategories = [];

  constructor(private mealsService: MealsService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.getCategories();

    const id = this.route.snapshot.paramMap.get('id');
    if(id) {
      this.categoryId = id;

      this.mealsService.getOne(id).subscribe((res) => {
        const { data } = res;

        this.defaultCategories = data.categories.map(cat => cat.id);

        this.mealForm.patchValue({
          ...data,
        });
      });
    }
  }

  async getCategories() {
    await this.mealsService.getCategories().subscribe(res => this.categories = res.data);
  }

  save() {
    if(this.mealForm.valid) {
      if(this.categoryId) {
        this.mealsService.update(this.categoryId, this.mealForm.value).subscribe(res => {
          this.router.navigate(['/tabs/meals']);
        });
      } else {
        this.mealsService.save(this.mealForm.value).subscribe(res => {
          this.router.navigate(['/tabs/meals']);
        });
      }
    }
  }
}
