import { Injectable } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/ru';
import { Observable, concatMap, from, map, timer } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class EventsGeneratorService {
  events: TimeLineEvent[] = [];
  lastCreatedDate?: any;
  dateNow = parseInt(moment().format('x'));
  intervalsArray: any[] = [];

  generateEvents(config: EventGeneratorConfig) {
    this.dateNow = parseInt(moment().format('x'));
    let min = config.min_delay;
    let max = config.max_delay;
    let val = this.randomVal;

    function getMoment(ms?: number, n?: number) {
      if (!n) n = 0;
      return moment(ms)
        .add(val(min, max) + n, 'seconds')
        .format('x');
    }

    this.lastCreatedDate = getMoment();

    do {
      this.events.push({
        dateStart: this.lastCreatedDate,
        dateEnd: getMoment(+this.lastCreatedDate),
        type:'',
      });
      this.lastCreatedDate = getMoment(+this.lastCreatedDate, 2);
    } while (
      Number(this.events[this.events.length - 1].dateEnd) - this.dateNow <
      config.duration
    );

      this.events.map(item => {
        item.type = this.getEventType(Math.abs(+item.dateStart - +item.dateEnd));
      })


    return this.events;
  }

  dropData(){
    this.intervalsArray = [];
    this.events = [];
  }

  randomVal(min: number, max: number): number {
    let rand = min + Math.random() * (max + 1 - min);
    return rand;
  }

  getEventTypeKey(value: any){
    return Object.keys(EventTypes)[Object.values(EventTypes).indexOf(value)]
  }


  getEventType(duration: number) {
    if (duration < 1000) {
      return EventTypes.NORMAL;
    }
    if (duration < 2500) {
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
  events: TimeLineEvent[];
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
export interface TimeLineEvent {
  dateStart: string;
  dateEnd: string;
  type: EventTypes[keyof EventTypes];
}
