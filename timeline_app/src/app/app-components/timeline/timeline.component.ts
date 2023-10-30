import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/ru';
import { IDropDown } from 'src/app/app-ui/drop-down-list/drop-down-list.component';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent implements OnInit {
  timerValues: IDropDown = {
    default: 1,
    values: [1, 2, 3, 5, 10],
  };
  initTime?: string;
  duration = this.timerValues.default;
  
  ngOnInit(): void {
    this.initTime = moment(+this.duration*60000).format('mm:ss');
  }

  setTimer(duration: number): void {
    const milliseconds = duration * 60000;
    const seconds = duration * 60;
    let counter = 1;
    let countDownTimer = setInterval(() => {
      console.log(moment(milliseconds - counter * 1000).format('mm:ss'));
      console.log(`counter: ${counter}, seconds: ${seconds}`);
      counter++;
      if (counter > seconds) {
        clearInterval(countDownTimer);
      }
    }, 1000);
  }

  setDuration(value: string) {
    this.duration = value;
    this.initTime = moment(+this.duration*60000).format('mm:ss');
  }
}
