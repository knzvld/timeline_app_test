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
  initTime?: string;
  timerValues: IDropDown = {
    default: 1,
    values: [1,2,3,5,10]
  }
  ngOnInit(): void {
   this.initTime = moment().format('HH:mm:ss:SSS')
  }

}
