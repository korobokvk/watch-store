import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {WatchInfoComponent} from "./watch-info/watch-info.component";
import {MainComponent} from "./main/main.component";

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'item', component: WatchInfoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
