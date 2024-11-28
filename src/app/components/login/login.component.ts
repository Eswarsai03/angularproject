import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HotToastService } from '@ngneat/hot-toast';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center p-4">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-md p-8">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p class="text-gray-600 mt-2">Please sign in to continue</p>
        </div>

        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-6">
          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Username</mat-label>
            <input matInput formControlName="username" placeholder="Enter your username">
            <mat-icon matSuffix>person</mat-icon>
            <mat-error *ngIf="loginForm.get('username')?.hasError('required')">
              Username is required
            </mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Password</mat-label>
            <input matInput [type]="hidePassword ? 'password' : 'text'" formControlName="password" placeholder="Enter your password">
            <button mat-icon-button matSuffix (click)="hidePassword = !hidePassword" type="button">
              <mat-icon>{{hidePassword ? 'visibility_off' : 'visibility'}}</mat-icon>
            </button>
            <mat-error *ngIf="loginForm.get('password')?.hasError('required')">
              Password is required
            </mat-error>
          </mat-form-field>

          <button mat-raised-button color="primary" type="submit" class="w-full py-6" [disabled]="loginForm.invalid">
            Sign In
          </button>

          <div class="text-center text-sm text-gray-600 mt-4">
            Demo Accounts:<br>
            Admin: admin/admin123<br>
            User: user/user123
          </div>
        </form>
      </div>
    </div>
  `
})
export class LoginComponent {
  loginForm: FormGroup;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toast: HotToastService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authService.login(username, password).subscribe({
        next: (user) => {
          this.toast.success(`Welcome back, ${user.fullName}!`);
          this.router.navigate([user.role === 'admin' ? '/admin/dashboard' : '/user/dashboard']);
        },
        error: (error) => {
          this.toast.error('Invalid username or password');
        }
      });
    }
  }
}