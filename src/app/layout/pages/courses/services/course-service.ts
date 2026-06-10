import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { LookupsApiResponse } from '../models/lookups.interface';
import { CourseApiResponse } from '../models/course.interface';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  _http = inject(HttpClient);

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // GET ALL COURSES
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  getCourses(body: any): Observable<CourseApiResponse> {
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
    return this._http.get<CourseApiResponse>(`${environment.baseUrl}courses`, { params });
  }
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // GET COURSE BY ID
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  getCourseById(id: string): Observable<CourseApiResponse> {
    return this._http.get<CourseApiResponse>(`${environment.baseUrl}courses/${id}`);
  }
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // CREATE COURSE
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  createCourse(courseData: any): Observable<any> {
    return this._http.post(`${environment.baseUrl}courses`, courseData);
  }
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // UPDATE COURSE
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  updateCourse(id: string, courseData: any): Observable<any> {
    return this._http.put(`${environment.baseUrl}courses/${id}`, courseData);
  }
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // DELETE COURSE
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  deleteCourse(id: string): Observable<any> {
    return this._http.delete(`${environment.baseUrl}courses/${id}`);
  }
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // GET LOOKUPS
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  getCategories(): Observable<LookupsApiResponse> {
    return this._http.get<LookupsApiResponse>(`${environment.baseUrl}lookups/categories`);
  }
  getPrices(): Observable<LookupsApiResponse> {
    return this._http.get<LookupsApiResponse>(`${environment.baseUrl}lookups/prices`);
  }
  getSkillLevels(): Observable<LookupsApiResponse> {
    return this._http.get<LookupsApiResponse>(`${environment.baseUrl}lookups/skill-levels`);
  }
  getLanguages(): Observable<LookupsApiResponse> {
    return this._http.get<LookupsApiResponse>(`${environment.baseUrl}lookups/languages`);
  }
}
