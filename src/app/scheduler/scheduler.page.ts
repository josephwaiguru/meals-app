import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, IonRouterOutlet, ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { MealsService } from '../services/meals.service';
import { SchedulerService } from '../services/scheduler.service';
import { AddComponent } from './add/add.component';

moment.updateLocale('en', {
  week: {
    dow: 7,
  },
});

@Component({
  selector: 'app-scheduler',
  templateUrl: 'scheduler.page.html',
  styleUrls: ['scheduler.page.scss']
})
export class SchedulerPage implements OnInit {

  selectedDate: moment.Moment;

  currentWeek: Array<moment.Moment>;

  weekDays: Array<any> = [];

  categories: Array<any> = [];

  meals: Array<any> = [];

  schedules: Array<any> = [];

  constructor(
    private actionSheetController: ActionSheetController,
    private alertController: AlertController,
    private mealsService: MealsService,
    private modalCtrl: ModalController,
    private schedulerService: SchedulerService) {}

  get currentWeekStr() {
    return this.currentWeek.map(w => w.format('MMM D')).join(' - ');
  }

  ngOnInit() {

    this.getCategories();

    this.getSchedules();

    this.getMeals();

    this.selectedDate = moment();

    this.setWeek();

    this.getDays();
  }

  getCategories() {
    this.mealsService.getCategories().subscribe(res => this.categories  = res.data);
  }

  getSchedules() {
    this.schedulerService.getAll().subscribe(res => this.schedules = res.data);
  }

  getMeals() {
    this.mealsService.getAll().subscribe(res => this.meals = res.data);
  }

  setWeek() {
    const start = this.selectedDate.clone().startOf('week');

    const end = this.selectedDate.clone().endOf('week');

    this.currentWeek = [start, end];
  }

  getDays() {
    // console.log(this.selectedDate, this.currentWeek);

    this.weekDays = [];

    for(let i = 0; i < 7; i++) {
      const date = moment(this.currentWeek[0], 'DD-MM-YYYY').add(i, 'days');

      this.weekDays.push(date);
    }
  }

  prev() {
    this.selectedDate = this.selectedDate.subtract(7, 'days');
    this.setWeek();
    this.getDays();
  }

  next() {
    this.selectedDate = this.selectedDate.add(7, 'days');
    this.setWeek();
    this.getDays();
  }

  async addSchedule(date, category) {
    const modal = await this.modalCtrl.create({
      component: AddComponent,
      // presentingElement: this.routerOutlet.nativeEl
      componentProps: {
        date,
        category,
        meals: this.meals.filter(meal => meal.categories.some(cat => cat.id === category))
      }
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();

    if(data && data.dismissed) {
      this.getSchedules();
    }
  }

  getDayCatMeals(date, category) {
    const dayCatSchedule = this.schedules.find(schedule => schedule.schedule_date === date &&
      schedule.category?.name.toLowerCase() === category.toLowerCase());

    return dayCatSchedule ? dayCatSchedule.meals : [];
  }

  async dayMealActions(meal, date, category) {
    const schedule = this.schedules.find(s => s.schedule_date === date.format('YYYY-MM-DD'));

    const actionSheet = await this.actionSheetController.create({
      header: `${date.format('MMM DD')}, ${meal.name} (${category})`,
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        id: 'delete-button',
        data: {
          type: 'delete'
        },
        handler: async () => {
          const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: 'Are you sure?',
            message: 'You won\'t be able to revert this.',
            buttons: [
              {
                text: 'No, cancel',
                role: 'cancel',
                cssClass: 'secondary',
                id: 'cancel-button',
                handler: (blah) => {
                  console.log('Confirm Cancel: blah');
                }
              }, {
                text: 'Yes, delete it!',
                id: 'confirm-button',
                handler: () => {
                  this.schedulerService.removeMeal(schedule.id, { meals: [meal]})
                    .subscribe(res => {
                      this.getSchedules();
                    });
                }
              }
            ]
          });

          await alert.present();
        }
      }, {
        text: 'Replace meal',
        icon: 'create-outline',
        handler: () => {
          console.log('Favorite clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role, data } = await actionSheet.onDidDismiss();
  }
}
