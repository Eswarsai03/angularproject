import { Component, ViewChild } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';
import { HotToastModule } from '@ngneat/hot-toast';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    HotToastModule
  ],
  template: `
    <mat-sidenav-container class="h-screen">
      <mat-sidenav #drawer mode="side" opened class="w-64 p-4 bg-white shadow-lg"
                   *ngIf="authService.currentUser$ | async as user">
        <div class="flex flex-col h-full">
          <div class="flex items-center mb-8">
            <mat-icon class="text-primary-500 mr-2">hotel</mat-icon>
            <span class="text-xl font-semibold">Hotel Booking</span>
          </div>
          
          <nav class="flex-1">
            <mat-nav-list>
              <!-- Admin Navigation -->
              <ng-container *ngIf="user.role === 'admin'">
                <a mat-list-item routerLink="/admin/dashboard" routerLinkActive="bg-primary-50">
                  <mat-icon matListItemIcon>dashboard</mat-icon>
                  <span matListItemTitle>Dashboard</span>
                </a>
                <a mat-list-item routerLink="/admin/hotels/add" routerLinkActive="bg-primary-50">
                  <mat-icon matListItemIcon>add_business</mat-icon>
                  <span matListItemTitle>Add Hotel</span>
                </a>
                <a mat-list-item routerLink="/admin/reports" routerLinkActive="bg-primary-50">
                  <mat-icon matListItemIcon>assessment</mat-icon>
                  <span matListItemTitle>Reports</span>
                </a>
              </ng-container>

              <!-- User Navigation -->
              <ng-container *ngIf="user.role === 'user'">
                <a mat-list-item routerLink="/user/dashboard" routerLinkActive="bg-primary-50">
                  <mat-icon matListItemIcon>dashboard</mat-icon>
                  <span matListItemTitle>Dashboard</span>
                </a>
                <a mat-list-item routerLink="/user/hotels" routerLinkActive="bg-primary-50">
                  <mat-icon matListItemIcon>hotel</mat-icon>
                  <span matListItemTitle>Hotels</span>
                </a>
                <a mat-list-item routerLink="/user/bookings" routerLinkActive="bg-primary-50">
                  <mat-icon matListItemIcon>book_online</mat-icon>
                  <span matListItemTitle>My Bookings</span>
                </a>
              </ng-container>
            </mat-nav-list>
          </nav>

          <div class="mt-auto">
            <div class="mb-4 px-4 py-2 bg-gray-50 rounded">
              <div class="text-sm font-medium">{{user.fullName}}</div>
              <div class="text-xs text-gray-500">{{user.role}}</div>
            </div>
            <button mat-flat-button color="warn" class="w-full" (click)="logout()">
              <mat-icon class="mr-2">exit_to_app</mat-icon>
              Logout
            </button>
          </div>
        </div>
      </mat-sidenav>

      <mat-sidenav-content>
        <mat-toolbar color="primary" class="shadow-md">
          <button mat-icon-button (click)="drawer.toggle()" 
                  *ngIf="authService.currentUser$ | async">
            <mat-icon>menu</mat-icon>
          </button>
          <span class="ml-4">Hotel Management System</span>
        </mat-toolbar>
        
        <div class="p-6">
          <router-outlet></router-outlet>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `
})
export class AppComponent {
  @ViewChild('drawer') drawer!: MatSidenav;
  
  constructor(public authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}