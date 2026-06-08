import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthPicture } from '../auth-picture/auth-picture';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [RouterModule, AuthPicture, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  _authService = inject(AuthService);
  _toastr = inject(ToastrService);
  _router = inject(Router);
  _cdr = inject(ChangeDetectorRef);
  isLoading = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  get email() {
    return this.loginForm.get('email')!;
  }
  get password() {
    return this.loginForm.get('password')!;
  }

  onSubmit() {
    if (this.loginForm.invalid) return;
    this.isLoading = true;
    this._cdr.markForCheck();
    this._authService.login(this.loginForm.value as { email: string; password: string }).subscribe({
      next: (res) => {
        this._authService.saveToken(res.data.token, res.data.user.role);
        this._toastr.success(res.message || 'Logged in successfully');
        this._router.navigate(['/']);
      },
      error: (err) => {
        this.isLoading = false;
        this._cdr.markForCheck();
        console.log(err.error?.message);
        this._toastr.error(err.error?.message || 'Login failed. Please try again.');
      },
    });
  }
}
