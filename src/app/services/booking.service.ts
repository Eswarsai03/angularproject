import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Booking } from '../models/booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private bookings: Booking[] = [
    {
      id: 1,
      userId: 2,
      hotelId: 1,
      checkIn: new Date('2024-01-15'),
      checkOut: new Date('2024-01-20'),
      status: 'confirmed',
      totalAmount: 1495,
      paymentStatus: 'paid',
      guestDetails: {
        fullName: 'John Doe',
        email: 'john@example.com',
        phone: '123-456-7890'
      },
      roomType: 'deluxe',
      numberOfGuests: 2,
      createdAt: new Date('2023-12-20')
    }
  ];

  createBooking(booking: Omit<Booking, 'id'>): Observable<Booking> {
    const newBooking: Booking = {
      ...booking,
      id: this.bookings.length + 1
    };
    this.bookings.push(newBooking);
    return of(newBooking);
  }

  getBookings(): Observable<Booking[]> {
    return of(this.bookings);
  }

  getUserBookings(): Observable<Booking[]> {
    // In a real app, filter by current user ID
    return of(this.bookings.filter(booking => booking.userId === 2));
  }

  updateBookingStatus(bookingId: number, status: Booking['status']): Observable<Booking> {
    const booking = this.bookings.find(b => b.id === bookingId);
    if (booking) {
      booking.status = status;
      return of(booking);
    }
    throw new Error('Booking not found');
  }
}