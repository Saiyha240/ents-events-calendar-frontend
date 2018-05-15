import { EntsCalendarModule } from './ents-calendar.module';

describe('EntsCalendarModule', () => {
  let entsCalendarModule: EntsCalendarModule;

  beforeEach(() => {
    entsCalendarModule = new EntsCalendarModule();
  });

  it('should create an instance', () => {
    expect(entsCalendarModule).toBeTruthy();
  });
});
