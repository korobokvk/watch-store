import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http"
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartComponent } from './cart/cart.component';
import { AccordionComponent } from './accordion/accordion.component';
import { PanelComponent } from './panel/panel.component';
import { WatchItemComponent } from './watch-item/watch-item.component';
import { FilterComponent } from './filter/filter.component';
import { SortingComponent } from './sorting/sorting.component';
import { ItemViewComponent } from './item-view/item-view.component';
import { WatchInfoComponent } from './watch-info/watch-info.component';
import { MainComponent } from './main/main.component';

import { DataService } from "./data.service";
import { PaginationService } from "./pagination.service";
import { SortingPipe } from './sorting.pipe'
import {FilterService} from "./filter.service";

@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    AccordionComponent,
    PanelComponent,
    WatchItemComponent,
    FilterComponent,
    SortingComponent,
    ItemViewComponent,
    WatchInfoComponent,
    MainComponent,
    SortingPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [DataService, PaginationService, FilterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
