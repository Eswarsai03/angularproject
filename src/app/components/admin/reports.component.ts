import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { NgChartsModule } from 'ng2-charts';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    NgChartsModule
  ],
  template: `
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-8">Reports & Analytics</h1>

      <mat-tab-group>
        <mat-tab label="Bookings Overview">
          <div class="p-6">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <mat-card>
                <mat-card-header>
                  <mat-card-title>Monthly Bookings</mat-card-title>
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
                  <mat-card-title>Booking Status Distribution</mat-card-title>
                </mat-card-header>
                <mat-card-content>
                  <canvas baseChart
                    [data]="statusChartData"
                    [options]="chartOptions"
                    type="pie">
                  </canvas>
                </mat-card-content>
              </mat-card>
            </div>
          </div>
        </mat-tab>

        <mat-tab label="Revenue Analysis">
          <div class="p-6">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <mat-card>
                <mat-card-header>
                  <mat-card-title>Revenue Trends</mat-card-title>
                </mat-card-header>
                <mat-card-content>
                  <canvas baseChart
                    [data]="revenueChartData"
                    [options]="chartOptions"
                    type="bar">
                  </canvas>
                </mat-card-content>
              </mat-card>

              <mat-card>
                <mat-card-header>
                  <mat-card-title>Revenue by Room Type</mat-card-title>
                </mat-card-header>
                <mat-card-content>
                  <canvas baseChart
                    [data]="roomTypeChartData"
                    [options]="chartOptions"
                    type="doughnut">
                  </canvas>
                </mat-card-content>
              </mat-card>
            </div>
          </div>
        </mat-tab>
      </mat-tab-group>
    </div>
  `
})
export class ReportsComponent implements OnInit {
  chartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };

  bookingsChartData: any;
  statusChartData: any;
  revenueChartData: any;
  roomTypeChartData: any;

  constructor(private bookingService: BookingService) {
    this.initializeChartData();
  }

  ngOnInit() {
    // In a real app, fetch data from service
  }

  private initializeChartData() {
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

    this.statusChartData = {
      labels: ['Confirmed', 'Completed', 'Cancelled'],
      datasets: [{
        data: [300, 500, 100],
        backgroundColor: [
          'rgb(54, 162, 235)',
          'rgb(75, 192, 192)',
          'rgb(255, 99, 132)'
        ]
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

    this.roomTypeChartData = {
      labels: ['Standard', 'Deluxe', 'Suite'],
      datasets: [{
        data: [30000, 50000, 20000],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ]
      }]
    };
  }
}