import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  // baseUrl: string = 'http://localhost:3000/api/';
  baseUrl: string = 'https://final-project-node-link.vercel.app/api/';
  _http = inject(HttpClient);

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // GET ALL COURSES
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  getCourses(body: any): Observable<any> {
    let params = new HttpParams();
    if (body.category?.length > 0) {
      params = params.append('category', body.category.join(','));
    }
    if (body.skillLevel?.length > 0) {
      params = params.append('level', body.skillLevel.join(','));
    }
    if (body.language?.length > 0) {
      params = params.append('language', body.language.join(','));
    }
    if (body.priceLevel) {
      params = params.append('priceLevel', body.priceLevel);
    }
    params = params.append('page', body.page);
    params = params.append('limit', body.limit);
    if (body.sort) {
      params = params.append('sort', body.sort);
    }
    return this._http.get(`${this.baseUrl}courses`, { params });
  }
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // GET COURSE BY ID
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  getCourseById(id: string): Observable<any> {
    return this._http.get(`${this.baseUrl}courses/${id}`);
  }
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // CREATE COURSE
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  createCourse(courseData: any): Observable<any> {
    return this._http.post(`${this.baseUrl}courses`, courseData);
  }
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // UPDATE COURSE
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  updateCourse(id: string, courseData: any): Observable<any> {
    return this._http.put(`${this.baseUrl}courses/${id}`, courseData);
  }
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // DELETE COURSE
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  deleteCourse(id: string): Observable<any> {
    return this._http.delete(`${this.baseUrl}courses/${id}`);
  }
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // GET LOOKUPS
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  getCategories(): Observable<any> {
    return this._http.get(`${this.baseUrl}lookups/categories`);
  }
  getPrices(): Observable<any> {
    return this._http.get(`${this.baseUrl}lookups/prices`);
  }
  getSkillLevels(): Observable<any> {
    return this._http.get(`${this.baseUrl}lookups/skill-levels`);
  }
  getLanguages(): Observable<any> {
    return this._http.get(`${this.baseUrl}lookups/languages`);
  }
}
