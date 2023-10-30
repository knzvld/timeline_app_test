import { Injectable } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/ru';
import { Observable, map, share, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LiveTimeService {
  currentTime$?: Observable<LiveTime> = timer(0, 1000).pipe(
    map(() => {
      return {
        hours: moment().format('HH'),
        minutes: moment().format('mm'),
        seconds: moment().format('ss'),
      };
    }),
    share()
  );
}

export interface LiveTime {
  hours: string;
  minutes: string;
  seconds: string;
}
