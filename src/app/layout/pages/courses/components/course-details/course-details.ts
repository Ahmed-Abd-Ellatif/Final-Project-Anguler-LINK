import { ChangeDetectorRef, Component, ElementRef, ViewChild, OnInit, inject } from '@angular/core';
import { CourseService } from '../../services/course-service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { Course, CourseApiResponse } from '../../models/course.interface';

@Component({
  selector: 'app-course-details',
  imports: [RouterLink],
  templateUrl: './course-details.html',
  styleUrl: './course-details.css',
})
export class CourseDetails implements OnInit {
  isAdmin = localStorage.getItem('final-project-role') === 'admin';
  courseId!: string;
  courseData!: Course;
  @ViewChild('tinySlider') tinySliderEl!: ElementRef<HTMLElement>;

  _courseService = inject(CourseService);
  _cdr = inject(ChangeDetectorRef);
  _router = inject(Router);

  constructor(private _activatedRoute: ActivatedRoute) {
    this.courseId = this._activatedRoute.snapshot.paramMap.get('id') || '';
  }

  ngOnInit(): void {
    this.getCourseById();
  }

  getCourseById() {
    this._courseService.getCourseById(this.courseId).subscribe((res: CourseApiResponse) => {
      this.courseData = res.data as Course;
      this._cdr.detectChanges();
    });
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // * DELETE COURSE
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  deleteCourse() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This course will be permanently deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this._courseService.deleteCourse(this.courseId).subscribe({
          next: () => {
            Swal.fire('Deleted!', 'The course has been deleted.', 'success').then(() => {
              this._router.navigate(['/courses-list']);
            });
          },
          error: () => {
            Swal.fire('Error!', 'Failed to delete the course.', 'error');
          },
        });
      }
    });
  }
}
