import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './app-components/main-page/main-page.component';
import { TimelineComponent } from './app-components/timeline/timeline.component';

const routes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'timeline', component: TimelineComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
