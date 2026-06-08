import { ChangeDetectorRef, Component, HostListener, inject, OnInit } from '@angular/core';
import { CourseService } from './services/course-service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-courses',
  imports: [CommonModule, RouterLink],
  templateUrl: './courses.html',
  styleUrl: './courses.css',
})
export class Courses implements OnInit {
  isAdmin = localStorage.getItem('final-project-role') === 'admin';
  courses: any[] = [];
  categories: any[] = [];
  prices: any[] = [];
  skillLevels: any[] = [];
  languages: any[] = [];
  totalResults: number = 0;
  currentPage: number = 1;
  limit: number = 4;
  numberOfPages: number = 1;
  pages: number[] = [];
  priceLevel: string = '';
  language: string[] = [];
  category: string[] = [];
  skillLevel: string[] = [];
  sort: string = '';
  activeDropdown: string | null = null;
  _courseService = inject(CourseService);
  _cdr = inject(ChangeDetectorRef);

  @HostListener('document:click')
  onDocumentClick() {
    this.activeDropdown = null;
  }

  toggleDropdown(event: MouseEvent, id: string) {
    event.stopPropagation();
    this.activeDropdown = this.activeDropdown === id ? null : id;
  }
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // * ON INIT
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  ngOnInit(): void {
    this.getCourses();
    this.getCategories();
    this.getPrices();
    this.getSkillLevels();
    this.getLanguages();
  }
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // * GET ALL COURSES
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  getCourses() {
    const filters = {
      category: this.category,
      skillLevel: this.skillLevel,
      language: this.language,
      priceLevel: this.priceLevel,
      page: this.currentPage,
      limit: this.limit,
      sort: this.sort,
    };
    this._courseService.getCourses(filters).subscribe({
      next: (res) => {
        this.courses = res.data;
        this.totalResults = res.paginationResult.totalResults;
        this.currentPage = res.paginationResult.currentPage;
        this.numberOfPages = res.paginationResult.numberOfPages;
        this.pages = Array.from({ length: this.numberOfPages }, (_, i) => i + 1);
        this._cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching courses:', err);
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
  getPrices() {
    this._courseService.getPrices().subscribe({
      next: (res) => {
        this.prices = res.data;
        this._cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching prices:', err);
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

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // * LOOKUPS
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  onCategoryChange(category: string) {
    if (this.category.includes(category)) {
      this.category = this.category.filter((cat) => cat !== category);
    } else {
      this.category.push(category);
    }
    console.log('Selected category:', this.category);
  }

  onSkillLevelChange(skillLevel: string) {
    if (this.skillLevel.includes(skillLevel)) {
      this.skillLevel = this.skillLevel.filter((level) => level !== skillLevel);
    } else {
      this.skillLevel.push(skillLevel);
    }
    console.log('Selected skill level:', this.skillLevel);
  }

  onLanguageChange(language: string) {
    if (this.language.includes(language)) {
      this.language = this.language.filter((lang) => lang !== language);
    } else {
      this.language.push(language);
    }
    console.log('Selected language:', this.language);
  }

  onPriceLevelChange(priceLevel: string) {
    this.priceLevel = priceLevel === 'All' ? '' : priceLevel;
  }

  onSortChange(event: Event) {
    this.sort = (event.target as HTMLSelectElement).value;
    this.currentPage = 1;
    this.getCourses();
  }

  Filter() {
    this.currentPage = 1;
    this.getCourses();
  }

  goToPage(page: number) {
    if (page < 1 || page > this.numberOfPages || page === this.currentPage) return;
    this.currentPage = page;
    this.getCourses();
  }

  get showingFrom(): number {
    return (this.currentPage - 1) * this.limit + 1;
  }

  get showingTo(): number {
    return Math.min(this.currentPage * this.limit, this.totalResults);
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // * DELETE COURSE
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  deleteCourse(id: string) {
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
        this._courseService.deleteCourse(id).subscribe({
          next: () => {
            Swal.fire('Deleted!', 'The course has been deleted.', 'success');
            this.getCourses();
          },
          error: () => {
            Swal.fire('Error!', 'Failed to delete the course.', 'error');
          },
        });
      }
    });
  }
}
