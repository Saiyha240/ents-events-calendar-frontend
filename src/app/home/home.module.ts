import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home.component';
import {EventsCalendarModule} from '../_utils/events-calendar/events-calendar.module';
import {CalendarModule} from 'angular-calendar';

@NgModule({
  imports: [
    CommonModule,
    CalendarModule,
    HomeRoutingModule,
    EventsCalendarModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule {
}
