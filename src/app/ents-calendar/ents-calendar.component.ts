import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {endOfDay, endOfMonth, endOfWeek, format, isSameDay, isSameMonth, startOfDay, startOfMonth, startOfWeek} from 'date-fns';
import {CalendarEvent} from 'angular-calendar';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/internal/operators';
import {Observable} from 'rxjs';

interface Film {
  id: number;
  title: string;
  release_date: string;
}

@Component({
  selector: 'app-ents-calendar',
  templateUrl: './ents-calendar.component.html',
  styleUrls: ['./ents-calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntsCalendarComponent implements OnInit {

  view = 'month';

  viewDate: Date = new Date();

  events$: Observable<Array<CalendarEvent<{ film: Film }>>>;

  activeDayIsOpen: boolean = false;

  colors: any = {
    red: {
      primary: '#ad2121',
      secondary: '#FAE3E3'
    },
    blue: {
      primary: '#1e90ff',
      secondary: '#D1E8FF'
    },
    yellow: {
      primary: '#e3bc08',
      secondary: '#FDF1BA'
    }
  };


  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.fetchEvents();
  }

  fetchEvents(): void {
    const getStart: any = {
      month: startOfMonth,
      week: startOfWeek,
      day: startOfDay
    }[this.view];

    const getEnd: any = {
      month: endOfMonth,
      week: endOfWeek,
      day: endOfDay
    }[this.view];

    const params = new HttpParams()
      .set(
        'primary_release_date.gte',
        format(getStart(this.viewDate), 'YYYY-MM-DD')
      )
      .set(
        'primary_release_date.lte',
        format(getEnd(this.viewDate), 'YYYY-MM-DD')
      )
      .set('api_key', '0ec33936a68018857d727958dca1424f');


    this.events$ = this.http
      .get('https://api.themoviedb.org/3/discover/movie', {params})
      .pipe(
        map(({results}: { results: Film[] }) => {
          return results.map((film: Film) => {
            return {
              title: film.title,
              start: new Date(film.release_date),
              color: this.colors.yellow,
              meta: {
                film
              }
            };
          });
        })
      );
  }

  dayClicked({
               date,
               events
             }: {
    date: Date;
    events: Array<CalendarEvent<{ film: Film }>>;
  }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  eventClicked(event: CalendarEvent<{ film: Film }>): void {
    window.open(
      `https://www.themoviedb.org/movie/${event.meta.film.id}`,
      '_blank'
    );
  }
}
