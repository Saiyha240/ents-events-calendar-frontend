import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EntsCalendarRoutingModule} from './ents-calendar-routing.module';
import {FormsModule} from '@angular/forms';
import {CalendarModule} from 'angular-calendar';

@NgModule({
  imports: [
    CommonModule,
    CalendarModule,
    FormsModule,
    EntsCalendarRoutingModule
  ],
  declarations: []
})
export class EntsCalendarModule {
}
