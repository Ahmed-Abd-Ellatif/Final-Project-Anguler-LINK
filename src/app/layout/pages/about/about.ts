import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { tns } from 'tiny-slider';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About implements AfterViewInit {
  @ViewChild('tinySlider') tinySliderEl!: ElementRef<HTMLElement>;

  ngAfterViewInit(): void {
    const el = this.tinySliderEl.nativeElement;
    tns({
      container: el,
      autoplay: el.dataset['autoplay'] !== 'false',
      controls: el.dataset['arrow'] !== 'false',
      nav: el.dataset['dots'] !== 'false',
      items: Number(el.dataset['items'] ?? 1),
      responsive: {
        768: { items: Number(el.dataset['itemsMd'] ?? 2) },
        992: { items: Number(el.dataset['itemsLg'] ?? 3) },
      },
    });
  }
}
