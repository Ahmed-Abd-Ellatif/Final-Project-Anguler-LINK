import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const _router = inject(Router);
  const _toastr = inject(ToastrService);
  const role = localStorage.getItem('final-project-role');
  if (role === 'admin') {
    return true;
  } else {
    _toastr.error('Access denied. Admins only.');
    _router.navigate(['/']);
    return false;
  }
};
