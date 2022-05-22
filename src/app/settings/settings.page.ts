import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss']
})
export class SettingsPage implements OnInit {

  daysOfWeek: Array<{ id: number; day: string }> = [];

  settingsForm: FormGroup = new FormGroup({
    startDayOfWeek: new FormControl('')
  });

  constructor() {}

  ngOnInit() {
    for(let i = 1; i < 7; i++) {
      this.daysOfWeek.push({ id: i, day: moment().day(i).format('ddd')});
    }
  }

  save() {
    if(this.settingsForm.valid) {
      localStorage.setItem('mp_settings', JSON.stringify(this.settingsForm.value));
    }
  }
}
