import { Component } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@Component({
  selector: 'app-home',
  templateUrl:'./home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  slides = [
    {img: "../../../assets/images/products/Catelogue_240805_234540.pdf-image-049.jpg"},
    {img: "../../../assets/images/products/Catelogue_240805_234540.pdf-image-050.jpg"},
    {img: "../../../assets/images/products/Catelogue_240805_234540.pdf-image-049.jpg"},
    {img: "../../../assets/images/products/Catelogue_240805_234540.pdf-image-049.jpg"},
    {img: "../../../assets/images/products/Catelogue_240805_234540.pdf-image-049.jpg"},
    {img: "../../../assets/images/products/Catelogue_240805_234540.pdf-image-050.jpg"},
    {img: "../../../assets/images/products/Catelogue_240805_234540.pdf-image-049.jpg"},
  ];
  slideConfig = {"slidesToShow": 4, "slidesToScroll": 4};
  
  addSlide() {
    this.slides.push({img: "http://placehold.it/350x150/777777"})
  }
  
  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }
  
  slickInit(e: any) {
    console.log('slick initialized');
  }
  
  breakpoint(e: any) {
    console.log('breakpoint');
  }
  
  afterChange(e: any) {
    console.log('afterChange');
  }
  
  beforeChange(e: any) {
    console.log('beforeChange');
  }
}
