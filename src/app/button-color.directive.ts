import { Directive, ElementRef, Input, OnInit, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appButtonColorIndex]'
})
export class ButtonColorDirective implements OnInit {
  @Input() appButtonColorIndex: number;
  colors = [
    '#f8ec77',
    '#304d6d',
    '#00bfb2',
    '#336699'
  ];

  hoveredColors = [
    '#f4e65d',
    '#254260',
    '#09b3a7',
    '#275889'
  ];

  ngOnInit() {
    this.el.nativeElement.style.backgroundColor = this.colors[this.appButtonColorIndex % this.colors.length];
  }

  @HostListener('mouseenter') mouseEnter(eventData: Event) {
    this.renderer.setStyle(this.el.nativeElement, 'background-color',
    this.hoveredColors[this.appButtonColorIndex % this.hoveredColors.length]);
  }

  @HostListener('mouseleave') mouseLeave(eventData: Event) {
    this.renderer.setStyle(this.el.nativeElement, 'background-color', this.colors[this.appButtonColorIndex % this.colors.length]);
  }

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

}
