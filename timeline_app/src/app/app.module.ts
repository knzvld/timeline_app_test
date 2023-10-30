import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './app-components/dashboard/dashboard.component';
import { MainPageComponent } from './app-components/main-page/main-page.component';
import { TimelineComponent } from './app-components/timeline/timeline.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MainPageComponent,
    TimelineComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
