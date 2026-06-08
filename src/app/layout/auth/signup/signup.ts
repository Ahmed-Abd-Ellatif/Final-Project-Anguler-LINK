import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthPicture } from '../auth-picture/auth-picture';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { AuthService } from '../services/auth-service';
import { ToastrService } from 'ngx-toastr';

function passwordsMatch(group: AbstractControl): ValidationErrors | null {
  const pass = group.get('password')?.value;
  const confirm = group.get('confirmPassword')?.value;
  return pass === confirm ? null : { passwordsMismatch: true };
}

@Component({
  selector: 'app-signup',
  imports: [RouterModule, AuthPicture, ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Signup {
  _authService = inject(AuthService);
  _toastr = inject(ToastrService);
  _router = inject(Router);
  _cdr = inject(ChangeDetectorRef);
  isLoading = false;

  signupForm = new FormGroup(
    {
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required]),
      termsAndConditions: new FormControl(false, [Validators.requiredTrue]),
    },
    { validators: passwordsMatch },
  );

  get name() {
    return this.signupForm.get('name')!;
  }
  get email() {
    return this.signupForm.get('email')!;
  }
  get password() {
    return this.signupForm.get('password')!;
  }
  get confirmPassword() {
    return this.signupForm.get('confirmPassword')!;
  }
  get terms() {
    return this.signupForm.get('termsAndConditions')!;
  }

  onSubmit() {
    if (this.signupForm.invalid) return;
    this.isLoading = true;
    this._cdr.markForCheck();
    this._authService.register(this.signupForm.value as any).subscribe({
      next: (res) => {
        this._toastr.success(res.message || 'Account created successfully!');
        this._router.navigate(['/login']);
      },
      error: (err) => {
        this.isLoading = false;
        this._cdr.markForCheck();
        this._toastr.error(err.error?.message || 'Registration failed. Please try again.');
      },
    });
  }
}
