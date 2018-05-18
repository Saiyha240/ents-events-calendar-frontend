import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CalendarModule} from 'angular-calendar';
import {EventsCalendarComponent} from './events-calendar.component';
import {CalendarHeaderComponent} from './calendar-header/calendar-header.component';
import {AngularFontAwesomeModule} from 'angular-font-awesome';

@NgModule({
  imports: [
    CommonModule,
    AngularFontAwesomeModule,
    CalendarModule
  ],
  declarations: [EventsCalendarComponent, CalendarHeaderComponent],
  exports: [EventsCalendarComponent]
})
export class EventsCalendarModule {
}
