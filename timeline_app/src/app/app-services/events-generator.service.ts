import { Injectable } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/ru';
@Injectable({
  providedIn: 'root',
})
export class EventsGeneratorService {
  events: Event[] = [];
  lastCreatedDate?: any;
  dateNow = parseInt(moment().format('x'));

  generateEvents(config: EventGeneratorConfig) {
    this.randomVal(config.min_delay, config.max_delay);

    this.lastCreatedDate = moment()
      .add(this.randomVal(config.min_delay, config.max_delay), 'seconds')
      .format('x');

    do {
      this.events.push({
        dateStart: this.lastCreatedDate,
        dateEnd: moment(+this.lastCreatedDate)
          .add(this.randomVal(config.min_delay, config.max_delay), 'seconds')
          .format('x'),
        type: this.getEventType(
          +moment(+this.lastCreatedDate)
            .add(this.randomVal(config.min_delay, config.max_delay), 'seconds')
            .format('x') - +this.lastCreatedDate
        ),
      });
      this.lastCreatedDate = moment(+this.lastCreatedDate)
        .add(this.randomVal(config.min_delay, config.max_delay) + 5, 'seconds')
        .format('x');
    } while (
      +this.events[this.events.length - 1].dateEnd - this.dateNow <
      config.duration
    );

    console.log(
      this.events.map(item => {
        return {
          dateStart: moment(+item.dateStart).format("YYYY MM DD HH:mm:ss"),
          dateEnd: moment(+item.dateEnd).format("YYYY MM DD HH:mm:ss"),
          type: item.type
        }
      })
    );
  }

  randomVal(min: number, max: number): number {
    let rand = min + Math.random() * (max + 1 - min);
    return rand;
  }

  getEventType(duration: number): string {
    if (duration < 1000) {
      return EventTypes.NORMAL;
    } else if (duration < 2500) {
      return EventTypes.DANGEROUS;
    } else {
      return EventTypes.CRITICAL;
    }
  }
}

export enum EventTypes {
  NORMAL = '#47d642',
  DANGEROUS = '#efca2c',
  CRITICAL = '#de2f2f',
}
export type Data = {
  events: Event[];
  intervalDates: IntervalDates;
};
export interface IntervalDates {
  dateStart: string;
  dateEnd: string;
}
export interface EventGeneratorConfig {
  min_delay: number;
  max_delay: number;
  duration: number;
}
export interface Event {
  dateStart: string;
  dateEnd: string;
  type: EventTypes[keyof EventTypes]
}
