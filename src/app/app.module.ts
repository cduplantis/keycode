import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';


import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatRippleModule } from '@angular/material/core';

import { AppComponent } from './app.component';
import { CarouselComponent } from './carousel/carousel.component';
import { CarouselItemDirective } from './carousel-item.directive';
import { SliderComponent } from './slider/slider.component';
import { SliderItemDirective } from './slider/slider-item.directive';

@NgModule({
  declarations: [
    AppComponent,
    CarouselComponent,
    CarouselItemDirective,
    SliderComponent,
    SliderItemDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatListModule,
    MatRippleModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
