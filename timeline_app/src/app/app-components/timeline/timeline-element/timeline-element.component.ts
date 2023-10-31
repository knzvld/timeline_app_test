import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { count } from 'rxjs';
import { TimeLineEvent } from 'src/app/app-services/events-generator.service';
import * as moment from 'moment';
import 'moment/locale/ru';

@Component({
  selector: 'app-timeline-element',
  templateUrl: './timeline-element.component.html',
  styleUrls: ['./timeline-element.component.scss'],
})
export class TimelineElementComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  @ViewChild('element') element!: ElementRef;
  @Input() timeLineElemtConfig!: TimelineElementConfig;
  shiftPerSecond!: number;
  eventStart: any;
  eventEnd: any;
  init_moment: any;
  rightPos: any;
  eventData?: any;

  ngOnInit(): void {
    this.eventData = {
      dateStart: moment(+this.timeLineElemtConfig.event.dateStart).format(
        'YYYY-MM-DD HH:mm:ss'
      ),
      dateEnd: moment(+this.timeLineElemtConfig.event.dateEnd).format(
        'YYYY-MM-DD HH:mm:ss'
      ),
      type: this.timeLineElemtConfig.event.type,
      duration: +this.timeLineElemtConfig.event.dateEnd - +this.timeLineElemtConfig.event.dateStart
    };
    this.shiftPerSecond = 100 / this.timeLineElemtConfig.total_duration; // in percent %
    this.eventStart = +this.timeLineElemtConfig.event.dateStart;
    this.eventEnd = +this.timeLineElemtConfig.event.dateEnd;
    this.init_moment = +this.timeLineElemtConfig.init_moment;
    let leftPosition =
      ((this.eventStart - this.init_moment) / 1000) * this.shiftPerSecond;
    this.rightPos = 100 - leftPosition;
    setTimeout(() => {
      this.growElement(this.eventEnd - this.eventStart, this.rightPos);
      this.element.nativeElement.style.left = `${leftPosition}%`;
      this.element.nativeElement.style.right = `${100 - leftPosition}%`;
    }, Number(this.timeLineElemtConfig.event.dateStart) - this.timeLineElemtConfig.init_moment);
  }
  growElement(duration: number, rightPosition: number) {
    let right = rightPosition;
    let milliseconds = duration;
    let counter = 100;
    let per100MilisecondShift = 0.1 * this.shiftPerSecond;
    let interval = setInterval(() => {
      if (milliseconds - counter > 0) {
        right = right - per100MilisecondShift;
        this.element.nativeElement.style.right = `${right}%`;
        counter = counter + 100;
      } else {
        clearInterval(interval);
      }
    }, 100);
  }
  ngAfterViewInit(): void {}
  ngOnDestroy(): void {}
}

export interface TimelineElementConfig {
  event: TimeLineEvent;
  track_width: number;
  total_duration: number;
  init_moment: number;
}
