import { Component, OnDestroy, OnInit } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/ru';
import { Subscription } from 'rxjs';
import { LiveTime, LiveTimeService } from 'src/app/app-services/live-time.service';

@Component({
  selector: 'app-watches',
  templateUrl: './watches.component.html',
  styleUrls: ['./watches.component.scss'],
})
export class WatchesComponent implements OnInit, OnDestroy {
  constructor(private liveTimeService: LiveTimeService) {}
  currentTime?: LiveTime;
  subscription?: Subscription
  ngOnInit(): void {
    this.subscription = this.liveTimeService.currentTime$?.subscribe(liveTime => {
      this.currentTime = liveTime;
    });
  }
  ngOnDestroy(): void {
   this.subscription?.unsubscribe();
  }
}
