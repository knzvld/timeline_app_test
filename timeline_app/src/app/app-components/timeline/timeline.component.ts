import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/ru';
import { EventsGeneratorService } from 'src/app/app-services/events-generator.service';
import { IDropDown } from 'src/app/app-ui/drop-down-list/drop-down-list.component';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent implements OnInit, AfterViewInit {
  constructor(private eventGeneratorService: EventsGeneratorService) {}

  @ViewChild('timeline') timeline!: ElementRef;
  @ViewChild('progressBar') progressBar!: ElementRef;

  timerValues: IDropDown = {
    default: 1,
    values: [1, 2, 3, 5, 10],
  };
  initTime?: string;
  duration = this.timerValues.default;
  onCountdown = false;

  ngOnInit(): void {
    this.initTime = moment(+this.duration * 60000).format('mm:ss');
  }
  ngAfterViewInit(): void {
    
  }


  setProgressBar(value: number): void {
    this.progressBar.nativeElement.style.right = `${value}%`;
  }

  setTimer(duration: number): void {
    this.onCountdown = true;
    const milliseconds = duration * 60000;
    const seconds = duration * 60;
    let counter = 1;
    this.eventGeneratorService.generateEvents({
      min_delay:0.5,
      max_delay:4,
      duration: milliseconds
    })
    this.setProgressBar(100);
    let countDownTimer = setInterval(() => {
      this.initTime = moment(milliseconds - counter * 1000).format('mm:ss');
      this.setProgressBar(100 - counter * (100 / seconds));
      counter++;
      if (counter > seconds) {
        clearInterval(countDownTimer);
        this.onCountdown = false;
      }
    }, 1000);
  }

  setDuration(value: string) {
    this.duration = value;
    this.initTime = moment(+this.duration * 60000).format('mm:ss');
    this.setProgressBar(100);
  }

  



}
