import { AuthService } from '../../services/auth.service';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { passwordMatchValidator } from './password-match.directive';
import { Router } from '@angular/router';
import { User } from '../../intefaces/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  // validations for email and password requirements
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

  submitDetails() {
    const { password, confirmPassword, ...userData } = this.registerForm.value;

    // Check if the email already exists
    this.authService.checkEmailExists(userData.email ?? '').subscribe(
      (emailExists) => {
        if (emailExists) {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Email already exists',
          });
        } else {
          // Email does not exist, proceed with registration
          const postData = { ...userData, password };

          this.authService.registerUser(postData as User).subscribe(
            (response) => {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Registered successfully!',
              });
              this.router.navigate(['login']);
            },
            (error) => {
              console.error('Error registering user:', error);
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Registration failed. Please try again later.',
              });
            }
          );
        }
      },
      (error) => {
        console.error('Error checking email existence:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Email already exists.',
        });
      }
    );
  }
}
