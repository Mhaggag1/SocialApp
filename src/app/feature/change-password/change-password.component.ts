import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/service/auth/auth.service';

@Component({
  selector: 'app-change-password',
  imports: [ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
})
export class ChangePasswordComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  errorMessage: WritableSignal<string> = signal('');
  successMessage: WritableSignal<string> = signal('');
  isLoading = signal(false);

  changePasswordForm: FormGroup = this.fb.group({
    password: [
      '',
      [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/),
      ],
    ],
    newPassword: [
      '',
      [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/),
      ],
    ],
  });

  submitChangePassword() {
    if (this.changePasswordForm.valid) {
      this.isLoading.set(true);
      this.errorMessage.set('');
      this.successMessage.set('');

      this.authService.changePassword(this.changePasswordForm.value).subscribe({
        next: (res) => {
          if (res?.data?.token) {
            localStorage.setItem('socialToken', res.data.token);
          }
          this.successMessage.set(res.message || 'Password changed successfully');
          this.changePasswordForm.reset();
          this.isLoading.set(false);
          setTimeout(() => {
            this.router.navigate(['/feed']);
          }, 1500);
        },
        error: (err) => {
          this.errorMessage.set(err?.error?.message || 'Failed to change password');
          this.isLoading.set(false);
        },
      });
    } else {
      this.changePasswordForm.markAllAsTouched();
    }
  }

  togglePassword(passwordElement: HTMLInputElement) {
    passwordElement.type = passwordElement.type === 'password' ? 'text' : 'password';
  }
}
