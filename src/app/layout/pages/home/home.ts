import { Component, ElementRef, ViewChild, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { tns } from 'tiny-slider';
import { CourseService } from '../courses/services/course-service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements  OnInit {
  @ViewChild('tinySlider') tinySliderEl!: ElementRef<HTMLElement>;
  _cdr = inject(ChangeDetectorRef);
  _courseService = inject(CourseService);



  ngOnInit(): void {
    this.getFeaturedCourses();
    this.getFreeCourses();
  }

  
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // * GET FEATURED COURSES
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  featuredCourses:any[]=[]
  getFeaturedCourses() {
    const filters = {
      page: 1,
      limit: 4,
      sort: '-rating',
    };
    this._courseService.getCourses(filters).subscribe({
      next: (res) => {
    this.featuredCourses = res.data;
    this._cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching courses:', err);
      },
    });
    
  }
  freeCourses:any[]=[]
  getFreeCourses() {
    const filters = {
      page: 1,
      limit: 4,
      priceLevel: 'Free'
    };
    this._courseService.getCourses(filters).subscribe({
      next: (res) => {
    this.freeCourses = res.data;
    this._cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching courses:', err);
      },
    });
  }
}
