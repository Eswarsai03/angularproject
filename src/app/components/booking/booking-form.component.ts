import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { BookingService } from '../../services/booking.service';

interface RoomRates {
  standard: number;
  deluxe: number;
  suite: number;
}

@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatSelectModule,
    MatIconModule
  ],
  template: `
    <mat-stepper linear #stepper class="bg-white rounded-lg">
      <mat-step [stepControl]="guestForm">
        <ng-template matStepLabel>Guest Information</ng-template>
        <form [formGroup]="guestForm" class="p-6 space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <mat-form-field appearance="outline">
              <mat-label>Full Name</mat-label>
              <input matInput formControlName="fullName" placeholder="John Doe">
              <mat-error *ngIf="guestForm.get('fullName')?.hasError('required')">
                Full name is required
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Email</mat-label>
              <input matInput formControlName="email" type="email">
              <mat-error *ngIf="guestForm.get('email')?.hasError('required')">
                Email is required
              </mat-error>
              <mat-error *ngIf="guestForm.get('email')?.hasError('email')">
                Please enter a valid email
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Phone</mat-label>
              <input matInput formControlName="phone">
              <mat-error *ngIf="guestForm.get('phone')?.hasError('required')">
                Phone number is required
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Number of Guests</mat-label>
              <input matInput type="number" formControlName="numberOfGuests" min="1">
              <mat-error *ngIf="guestForm.get('numberOfGuests')?.hasError('required')">
                Number of guests is required
              </mat-error>
              <mat-error *ngIf="guestForm.get('numberOfGuests')?.hasError('min')">
                At least 1 guest is required
              </mat-error>
            </mat-form-field>
          </div>

          <div class="flex justify-end">
            <button mat-raised-button color="primary" matStepperNext [disabled]="!guestForm.valid">
              Next
            </button>
          </div>
        </form>
      </mat-step>

      <mat-step [stepControl]="bookingForm">
        <ng-template matStepLabel>Booking Details</ng-template>
        <form [formGroup]="bookingForm" class="p-6 space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <mat-form-field appearance="outline">
              <mat-label>Check-in Date</mat-label>
              <input matInput [matDatepicker]="checkInPicker" formControlName="checkIn">
              <mat-datepicker-toggle matSuffix [for]="checkInPicker"></mat-datepicker-toggle>
              <mat-datepicker #checkInPicker></mat-datepicker>
              <mat-error *ngIf="bookingForm.get('checkIn')?.hasError('required')">
                Check-in date is required
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Check-out Date</mat-label>
              <input matInput [matDatepicker]="checkOutPicker" formControlName="checkOut">
              <mat-datepicker-toggle matSuffix [for]="checkOutPicker"></mat-datepicker-toggle>
              <mat-datepicker #checkOutPicker></mat-datepicker>
              <mat-error *ngIf="bookingForm.get('checkOut')?.hasError('required')">
                Check-out date is required
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Room Type</mat-label>
              <mat-select formControlName="roomType">
                <mat-option value="standard">Standard Room - $299.99/night</mat-option>
                <mat-option value="deluxe">Deluxe Room - $399.99/night</mat-option>
                <mat-option value="suite">Suite - $599.99/night</mat-option>
              </mat-select>
              <mat-error *ngIf="bookingForm.get('roomType')?.hasError('required')">
                Room type is required
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Special Requests</mat-label>
              <textarea matInput formControlName="specialRequests" rows="4"></textarea>
            </mat-form-field>
          </div>

          <div class="flex justify-between">
            <button mat-button matStepperPrevious>Back</button>
            <button mat-raised-button color="primary" matStepperNext [disabled]="!bookingForm.valid">
              Next
            </button>
          </div>
        </form>
      </mat-step>

      <mat-step>
        <ng-template matStepLabel>Review & Payment</ng-template>
        <div class="p-6">
          <div class="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 class="text-xl font-bold mb-4">Booking Summary</h3>
            <div class="space-y-2">
              <div class="flex justify-between">
                <span class="text-gray-600">Room Type:</span>
                <span class="font-medium">{{bookingForm.get('roomType')?.value | titlecase}} Room</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Check-in:</span>
                <span class="font-medium">{{bookingForm.get('checkIn')?.value | date}}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Check-out:</span>
                <span class="font-medium">{{bookingForm.get('checkOut')?.value | date}}</span>
              </div>
              <div class="flex justify-between text-lg font-bold mt-4 pt-4 border-t">
                <span>Total Amount:</span>
                <span class="text-primary-600">{{calculateTotalAmount() | currency}}</span>
              </div>
            </div>
          </div>

          <div class="flex justify-between">
            <button mat-button matStepperPrevious>Back</button>
            <button mat-raised-button color="primary" (click)="onSubmit()">
              Confirm Booking
            </button>
          </div>
        </div>
      </mat-step>
    </mat-stepper>
  `
})
export class BookingFormComponent {
  @Input() hotelId!: number;
  
  guestForm: FormGroup;
  bookingForm: FormGroup;
  
  private roomRates: RoomRates = {
    standard: 299.99,
    deluxe: 399.99,
    suite: 599.99
  };

  constructor(
    private fb: FormBuilder,
    private bookingService: BookingService,
    private router: Router,
    private toast: HotToastService
  ) {
    this.guestForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      numberOfGuests: [1, [Validators.required, Validators.min(1)]]
    });

    this.bookingForm = this.fb.group({
      checkIn: ['', Validators.required],
      checkOut: ['', Validators.required],
      roomType: ['standard', Validators.required],
      specialRequests: ['']
    });
  }

  calculateTotalAmount(): number {
    const roomType = this.bookingForm.get('roomType')?.value as keyof RoomRates || 'standard';
    return this.roomRates[roomType];
  }

  onSubmit() {
    if (this.guestForm.valid && this.bookingForm.valid) {
      const booking = {
        ...this.guestForm.value,
        ...this.bookingForm.value,
        hotelId: this.hotelId,
        totalAmount: this.calculateTotalAmount(),
        status: 'confirmed',
        paymentStatus: 'paid'
      };

      this.bookingService.createBooking(booking).subscribe({
        next: () => {
          this.toast.success('Booking confirmed successfully!');
          this.router.navigate(['/user/bookings']);
        },
        error: () => {
          this.toast.error('Failed to create booking. Please try again.');
        }
      });
    }
  }
}

