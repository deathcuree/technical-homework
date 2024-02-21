import { AuthService } from '../../services/auth.service';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { passwordMatchValidator } from './password-match.directive';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { User } from '../../intefaces/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm = this.fb.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
        ],
      ],
      confirmPassword: ['', Validators.required],
    },
    {
      validators: passwordMatchValidator,
    }
  );

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {}

  get email() {
    return this.registerForm.controls['email'];
  }

  get password() {
    return this.registerForm.controls['password'];
  }

  get confirmPassword() {
    return this.registerForm.controls['confirmPassword'];
  }

  // validation error messages before submitting the register form
  submitDetails() {
    const { password, confirmPassword, ...userData } = this.registerForm.value;

    // Password validation criteria
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    if (!password || typeof password !== 'string') {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Invalid password. Please enter a valid password.',
      });
      return;
    }

    if (password !== confirmPassword) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Passwords do not match',
      });
      return;
    }

    if (!passwordRegex.test(password)) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail:
          'Password must be at least 8 characters long and include a combination of upper and lowercase letters and numbers.',
      });
      return;
    }

    // pushing the data
    const postData = { ...userData, password };

    this.authService.registerUser(postData as User).subscribe(
      (response) => {
        console.log(response);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Registered successfully!',
        });
        this.router.navigate(['login']);
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Something went wrong',
        });
      }
    );
  }
}
