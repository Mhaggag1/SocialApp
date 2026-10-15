import { Component, inject, signal, WritableSignal } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/service/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  loginErrorMessage: WritableSignal<string> = signal('');
  loginSuccsessMessage: WritableSignal<string> = signal('');

  isError = signal(false);
  isLoading = signal(false);

  loginForm: FormGroup = this.fb.group({
    // Sugar Syntax
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/),
      ],
    ],
  });
  // loginForm = new FormGroup({
  //   email: new FormControl('', [Validators.required, Validators.email]),
  //   password: new FormControl('', [
  //     Validators.required,
  //     Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/),
  //   ]),
  // });

  Submitlogin() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.isLoading.set(true);
      // subscribe api
      this.authService.login(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res);
          // navigate to login
          if (res.success) {
            localStorage.setItem('socialToken', res.data.token);
            localStorage.setItem('socialUser', JSON.stringify(res.data.user));

            this.loginSuccsessMessage.set(res.message);
            setTimeout(() => {
              this.router.navigate(['/feed']);
            }, 2000);
          }
        },
        error: (err) => {
          this.isError.set(true);
          console.log(err.error.message);
          this.loginErrorMessage.set(err.error.message);
          this.isLoading.set(false);
        },
        complete: () => {
          this.isLoading.set(false);
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  ConfirmPassword(form: AbstractControl) {
    const password = form.get('password')?.value;
    const rePassword = form.get('rePassword')?.value;

    if (password !== rePassword && form.get('rePassword')?.touched) {
      form.get('rePassword')?.setErrors({ mismatch: true });
      return { mismatch: true };
    } else {
      return null;
    }
  }
  togglePassword(passwordElement: any) {
    if (passwordElement.type == 'password') {
      passwordElement.type = 'text';
    } else {
      passwordElement.type = 'password';
    }
  }
}
