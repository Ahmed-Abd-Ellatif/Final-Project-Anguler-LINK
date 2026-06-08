import { Routes } from '@angular/router';
import { authGuard } from './core/auth-guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/pages/pages').then((m) => m.Pages),
    children: [
      { path: '', loadComponent: () => import('./layout/pages/home/home').then((m) => m.Home) },
      {
        path: 'about',
        loadComponent: () => import('./layout/pages/about/about').then((m) => m.About),
      },
      {
        path: 'courses-list',
        loadComponent: () => import('./layout/pages/courses/courses').then((m) => m.Courses),
      },
      {
        path: 'courses-list/:id',
        pathMatch: 'full',
        loadComponent: () =>
          import('./layout/pages/courses/components/course-details/course-details').then(
            (m) => m.CourseDetails,
          ),
      },
      {
        path: 'course/add',
        canActivate: [authGuard],
        pathMatch: 'full',
        loadComponent: () =>
          import('./layout/pages/courses/components/add-edit/add-edit').then((m) => m.AddEdit),
      },
      {
        path: 'course/edit/:id',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./layout/pages/courses/components/add-edit/add-edit').then((m) => m.AddEdit),
      },
    ],
  },
  { path: 'login', loadComponent: () => import('./layout/auth/login/login').then((m) => m.Login) },
  {
    path: 'signup',
    loadComponent: () => import('./layout/auth/signup/signup').then((m) => m.Signup),
  },

  {
    path: '**',
    loadComponent: () => import('./layout/pages/error-404/error-404').then((m) => m.Error404),
  },
];
