import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { BookingService } from '../../services/booking.service';
import { Booking } from '../../models/booking.model';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-booking-history',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatChipsModule],
  template: `
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-8">Your Bookings</h1>

      <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <table mat-table [dataSource]="bookings" class="w-full">
          <ng-container matColumnDef="hotelName">
            <th mat-header-cell *matHeaderCellDef>Hotel</th>
            <td mat-cell *matCellDef="let booking">{{getHotelName(booking.hotelId)}}</td>
          </ng-container>

          <ng-container matColumnDef="dates">
            <th mat-header-cell *matHeaderCellDef>Dates</th>
            <td mat-cell *matCellDef="let booking">
              {{formatDate(booking.checkIn)}} - {{formatDate(booking.checkOut)}}
            </td>
          </ng-container>

          <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef>Status</th>
            <td mat-cell *matCellDef="let booking">
              <mat-chip-set>
                <mat-chip [color]="getStatusColor(booking.status)" selected>
                  {{booking.status}}
                </mat-chip>
              </mat-chip-set>
            </td>
          </ng-container>

          <ng-container matColumnDef="amount">
            <th mat-header-cell *matHeaderCellDef>Amount</th>
            <td mat-cell *matCellDef="let booking">\${{booking.totalAmount}}</td>
          </ng-container>

          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef>Actions</th>
            <td mat-cell *matCellDef="let booking">
              <button mat-icon-button color="primary" 
                      [disabled]="!canCancel(booking)"
                      (click)="cancelBooking(booking)">
                <mat-icon>cancel</mat-icon>
              </button>
              <button mat-icon-button color="accent">
                <mat-icon>receipt</mat-icon>
              </button>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
      </div>
    </div>
  `
})
export class BookingHistoryComponent implements OnInit {
  bookings: Booking[] = [];
  displayedColumns: string[] = ['hotelName', 'dates', 'status', 'amount', 'actions'];

  constructor(private bookingService: BookingService) {}

  ngOnInit() {
    this.loadBookings();
  }

  loadBookings() {
    this.bookingService.getUserBookings().subscribe(bookings => {
      this.bookings = bookings;
    });
  }

  getHotelName(hotelId: number): string {
    // Mock implementation - In real app, get from HotelService
    return `Hotel #${hotelId}`;
  }

  formatDate(date: Date): string {
    return formatDate(date, 'MMM dd, yyyy', 'en-US');
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'confirmed': return 'primary';
      case 'completed': return 'accent';
      case 'cancelled': return 'warn';
      default: return 'default';
    }
  }

  canCancel(booking: Booking): boolean {
    return booking.status === 'confirmed';
  }

  cancelBooking(booking: Booking) {
    this.bookingService.updateBookingStatus(booking.id, 'cancelled').subscribe(() => {
      this.loadBookings();
    });
  }
}

