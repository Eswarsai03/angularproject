import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgChartsModule } from 'ng2-charts';
import { RoomService } from '../../services/room.service';
import { BookingService } from '../../services/booking.service';
import { Room } from '../../models/room.model';
import { Booking } from '../../models/booking.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, NgChartsModule],
  template: `
    <div class="container">
      <!-- Stats Overview -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="dashboard-stat-card">
          <div class="flex items-center justify-between">
            <div>
              <p class="stat-label">Total Rooms</p>
              <p class="stat-value">{{rooms.length}}</p>
            </div>
            <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <mat-icon class="text-blue-600">meeting_room</mat-icon>
            </div>
          </div>
        </div>

        <div class="dashboard-stat-card">
          <div class="flex items-center justify-between">
            <div>
              <p class="stat-label">Available Rooms</p>
              <p class="stat-value">{{getAvailableRooms()}}</p>
            </div>
            <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <mat-icon class="text-green-600">check_circle</mat-icon>
            </div>
          </div>
        </div>

        <div class="dashboard-stat-card">
          <div class="flex items-center justify-between">
            <div>
              <p class="stat-label">Occupied Rooms</p>
              <p class="stat-value">{{getOccupiedRooms()}}</p>
            </div>
            <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <mat-icon class="text-red-600">hotel</mat-icon>
            </div>
          </div>
        </div>

        <div class="dashboard-stat-card">
          <div class="flex items-center justify-between">
            <div>
              <p class="stat-label">Today's Bookings</p>
              <p class="stat-value">{{getTodayBookings()}}</p>
            </div>
            <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <mat-icon class="text-purple-600">event</mat-icon>
            </div>
          </div>
        </div>
      </div>

      <!-- Room Status Overview -->
      <div class="grid md:grid-cols-2 gap-6">
        <mat-card>
          <mat-card-header>
            <mat-card-title class="flex items-center">
              <mat-icon class="mr-2">meeting_room</mat-icon>
              Room Status
            </mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
              <div *ngFor="let room of rooms" 
                   class="p-4 rounded-lg border"
                   [ngClass]="{
                     'border-green-200 bg-green-50': room.status === 'available',
                     'border-red-200 bg-red-50': room.status === 'occupied',
                     'border-yellow-200 bg-yellow-50': room.status === 'maintenance'
                   }">
                <div class="text-lg font-semibold">Room {{room.number}}</div>
                <div class="text-sm text-gray-600">{{room.type}}</div>
                <div class="mt-2">
                  <span class="status-badge" [ngClass]="'status-' + room.status.toLowerCase()">
                    {{room.status}}
                  </span>
                </div>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- Recent Bookings -->
        <mat-card>
          <mat-card-header>
            <mat-card-title class="flex items-center">
              <mat-icon class="mr-2">book_online</mat-icon>
              Recent Bookings
            </mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="mt-4 space-y-4">
              <div *ngFor="let booking of recentBookings" 
                   class="p-4 rounded-lg border border-gray-200 hover:bg-gray-50">
                <div class="flex justify-between items-start">
                  <div>
                    <div class="font-medium">Booking #{{booking.id}}</div>
                    <div class="text-sm text-gray-500">
                      {{booking.checkIn | date}} - {{booking.checkOut | date}}
                    </div>
                  </div>
                  <span class="status-badge" 
                        [ngClass]="{
                          'bg-green-100 text-green-800': booking.status === 'confirmed',
                          'bg-blue-100 text-blue-800': booking.status === 'checked-in',
                          'bg-gray-100 text-gray-800': booking.status === 'checked-out'
                        }">
                    {{booking.status}}
                  </span>
                </div>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  rooms: Room[] = [];
  bookings: Booking[] = [];
  recentBookings: Booking[] = [];

  constructor(
    private roomService: RoomService,
    private bookingService: BookingService
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.roomService.getRooms().subscribe(rooms => {
      this.rooms = rooms;
    });

    this.bookingService.getBookings().subscribe(bookings => {
      this.bookings = bookings;
      this.recentBookings = bookings.slice(0, 5);
    });
  }

  getAvailableRooms(): number {
    return this.rooms.filter(room => room.status === 'available').length;
  }

  getOccupiedRooms(): number {
    return this.rooms.filter(room => room.status === 'occupied').length;
  }

  getTodayBookings(): number {
    const today = new Date();
    return this.bookings.filter(booking => 
      new Date(booking.checkIn).toDateString() === today.toDateString()
    ).length;
  }
}