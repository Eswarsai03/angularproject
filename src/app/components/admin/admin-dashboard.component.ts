import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { NgChartsModule } from 'ng2-charts';
import { BookingService } from '../../services/booking.service';
import { HotelService } from '../../services/hotel.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    NgChartsModule
  ],
  template: `
    <div class="container mx-auto px-4 py-8">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold">Admin Dashboard</h1>
        <button mat-raised-button color="primary" routerLink="/admin/hotels/add">
          <mat-icon>add</mat-icon>
          Add New Hotel
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <mat-card class="stat-card">
          <mat-card-content>
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-600">Total Bookings</p>
                <h3 class="text-3xl font-bold">{{stats.totalBookings}}</h3>
              </div>
              <mat-icon class="text-primary-500">book_online</mat-icon>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-content>
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-600">Total Revenue</p>
                <h3 class="text-3xl font-bold">\${{stats.totalRevenue}}</h3>
              </div>
              <mat-icon class="text-green-500">payments</mat-icon>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-content>
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-600">Active Hotels</p>
                <h3 class="text-3xl font-bold">{{stats.activeHotels}}</h3>
              </div>
              <mat-icon class="text-blue-500">hotel</mat-icon>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-content>
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-600">Total Users</p>
                <h3 class="text-3xl font-bold">{{stats.totalUsers}}</h3>
              </div>
              <mat-icon class="text-purple-500">people</mat-icon>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <mat-card>
          <mat-card-header>
            <mat-card-title>Recent Bookings</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <canvas baseChart
              [data]="bookingsChartData"
              [options]="chartOptions"
              type="line">
            </canvas>
          </mat-card-content>
        </mat-card>

        <mat-card>
          <mat-card-header>
            <mat-card-title>Revenue Overview</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <canvas baseChart
              [data]="revenueChartData"
              [options]="chartOptions"
              type="bar">
            </canvas>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .stat-card {
      transition: transform 0.2s;
      &:hover {
        transform: translateY(-4px);
      }
    }
  `]
})
export class AdminDashboardComponent implements OnInit {
  stats = {
    totalBookings: 0,
    totalRevenue: 0,
    activeHotels: 0,
    totalUsers: 0
  };

  bookingsChartData: any;
  revenueChartData: any;
  chartOptions: any;

  constructor(
    private bookingService: BookingService,
    private hotelService: HotelService
  ) {
    this.initializeChartData();
  }

  ngOnInit() {
    this.loadDashboardData();
  }

  private initializeChartData() {
    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false
    };

    this.bookingsChartData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        label: 'Bookings',
        data: [65, 59, 80, 81, 56, 55],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    };

    this.revenueChartData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        label: 'Revenue',
        data: [12000, 19000, 15000, 25000, 22000, 30000],
        backgroundColor: 'rgba(54, 162, 235, 0.5)'
      }]
    };
  }

  private loadDashboardData() {
    // In a real application, these would be API calls
    this.stats = {
      totalBookings: 156,
      totalRevenue: 45600,
      activeHotels: 12,
      totalUsers: 89
    };
  }
}