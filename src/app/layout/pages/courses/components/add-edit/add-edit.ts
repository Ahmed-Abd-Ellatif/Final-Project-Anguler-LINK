import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CourseService } from '../../services/course-service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-edit.html',
  styleUrl: './add-edit.css',
})
export class AddEdit implements OnInit {
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // * VARIABLES
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  courseId: string | null = null;
  isEditMode: boolean = false;
  categories: any[] = [];
  skillLevels: any[] = [];
  languages: any[] = [];
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // * CONSTRUCTOR
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  _fb = inject(FormBuilder);
  _courseService = inject(CourseService);
  _cdr = inject(ChangeDetectorRef);
  _toastr = inject(ToastrService);
  constructor(private _activatedRoute: ActivatedRoute) {
    this.courseId = this._activatedRoute.snapshot.paramMap.get('id');
    this.isEditMode = !!this.courseId;
  }
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // * ngOnInit
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  ngOnInit(): void {
    if (this.isEditMode) {
      this.getCourseById();
    }
    this.getCategories();
    this.getSkillLevels();
    this.getLanguages();
  }
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // * FORM
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  form = this._fb.group({
    title: [null, Validators.required],
    description: [null, Validators.required],
    instructor: [null, Validators.required],
    numberOfHours: [null, Validators.required],
    numberOfMinutes: [null, Validators.required],
    numberOfLectures: [null, Validators.required],
    price: [0, Validators.required],
    rating: [null, Validators.required],
    priceLevel: ['Free'],
    category: [null, Validators.required],
    level: [null, Validators.required],
    language: [null, Validators.required],
    courseImage: [null, Validators.required],
  });
  get formControls() {
    return this.form.controls;
  }
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // * FORM
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  onSubmit() {
    const courseData = {
      ...this.form.value,
      priceLevel: this.formControls.price.value == 0 ? 'Free' : 'Paid',
    };

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    if (this.isEditMode) {
      this._courseService.updateCourse(this.courseId!, courseData).subscribe({
        next: (res) => {
          this._toastr.success('Course updated successfully!');
        },
        error: (err) => {
          console.error('Error updating course:', err);
          this._toastr.error(err.error?.message || 'Failed to update course. Please try again.');
        },
      });
    } else {
      this._courseService.createCourse(courseData).subscribe({
        next: (res) => {
          this._toastr.success('Course created successfully!');
        },
        error: (err) => {
          console.error('Error creating course:', err);
          this._toastr.error('Failed to create course. Please try again.');
        },
      });
    }
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // * GET COURSE BY ID
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  getCourseById() {
    this._courseService.getCourseById(this.courseId!).subscribe({
      next: (res) => {
        const course = res.data;
        this.form.patchValue({
          title: course.title,
          description: course.description,
          instructor: course.instructor,
          numberOfHours: course.numberOfHours,
          numberOfMinutes: course.numberOfMinutes,
          numberOfLectures: course.numberOfLectures,
          price: course.price,
          rating: course.rating,
          priceLevel: course.priceLevel,
          category: course.category,
          level: course.level,
          language: course.language,
          courseImage: course.courseImage,
        });
        this._cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching course:', err);
      },
    });
  }
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // * LOOKUPS
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  getCategories() {
    this._courseService.getCategories().subscribe({
      next: (res) => {
        this.categories = res.data;
        this._cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      },
    });
  }

  getSkillLevels() {
    this._courseService.getSkillLevels().subscribe({
      next: (res) => {
        this.skillLevels = res.data;
        this._cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching skill levels:', err);
      },
    });
  }
  getLanguages() {
    this._courseService.getLanguages().subscribe({
      next: (res) => {
        this.languages = res.data;
        this._cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching languages:', err);
      },
    });
  }
}
