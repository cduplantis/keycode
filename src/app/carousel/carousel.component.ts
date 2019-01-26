import { Component, OnInit, ContentChildren, ViewChildren, ElementRef, ViewChild, Input } from '@angular/core';
import { CarouselItemDirective } from '../carousel-item.directive';
import { QueryList } from '@angular/core';
import { AnimationPlayer, AnimationFactory, animate, style, AnimationBuilder } from '@angular/animations';

@Component({
  selector: 'app-carousel',
  exportAs: 'carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  @ContentChildren(CarouselItemDirective) items: QueryList<CarouselItemDirective>;
  @ViewChildren(CarouselItemDirective, { read: ElementRef }) private itemsElements: QueryList<ElementRef>;
  @ViewChild('carousel') private carousel : ElementRef;
  @Input() timing = '250ms ease-in';
  @Input() showControls = true;
  private player: AnimationPlayer;
  private itemWidth: number;
  private currentSlide = 0;
  constructor(private builder: AnimationBuilder) { }

  ngOnInit() {
  }


  next() {
    if (this.currentSlide + 1 === this.items.length ) { 
      return;
    }

    this.currentSlide = (this.currentSlide + 1) % this.items.length;

    const offset = this.currentSlide * this.itemWidth;

    const myAnimation: AnimationFactory = this.builder.build([
       animate(this.timing, style({ transform: `translateX(-${offset}px)` }))
    ]);

    this.player = myAnimation.create(this.carousel.nativeElement);
    this.player.play();
  }

  prev() {
    if (this.currentSlide === 0 ) {
      return;
    }

     this.currentSlide = ((this.currentSlide - 1) + this.items.length) % this.items.length;
     const offset = this.currentSlide * this.itemWidth;

     const myAnimation : AnimationFactory = this.builder.build([
       animate(this.timing, style({ transform: `translateX(-${offset}px)` }))
     ]);

     this.player = myAnimation.create(this.carousel.nativeElement);
     this.player.play();
   }
}
