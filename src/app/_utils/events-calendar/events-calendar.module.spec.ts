import { EventsCalendarModule } from './events-calendar.module';

describe('EventsCalendarModule', () => {
  let eventsCalendarModule: EventsCalendarModule;

  beforeEach(() => {
    eventsCalendarModule = new EventsCalendarModule();
  });

  it('should create an instance', () => {
    expect(eventsCalendarModule).toBeTruthy();
  });
});
