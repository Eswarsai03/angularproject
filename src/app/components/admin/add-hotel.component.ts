import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule, MatChipInputEvent } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { HotelService } from '../../services/hotel.service';
import { HotToastService } from '@ngneat/hot-toast';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-add-hotel',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatChipsModule,
    MatIconModule,
  ],
  template: `
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-2xl mx-auto">
        <h1 class="text-3xl font-bold mb-8">Add New Hotel</h1>

        <form [formGroup]="hotelForm" (ngSubmit)="onSubmit()" class="space-y-6">
          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Hotel Name</mat-label>
            <input matInput formControlName="name" placeholder="Enter hotel name">
          </mat-form-field>

          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Location</mat-label>
            <input matInput formControlName="location" placeholder="City, State">
          </mat-form-field>

          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Description</mat-label>
            <textarea matInput formControlName="description" rows="4"></textarea>
          </mat-form-field>

          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Image URL</mat-label>
            <input matInput formControlName="imageUrl" placeholder="Enter image URL">
          </mat-form-field>

          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Price per Night</mat-label>
            <input matInput type="number" formControlName="pricePerNight" min="0">
            <span matPrefix>$&nbsp;</span>
          </mat-form-field>

          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Rating</mat-label>
            <input matInput type="number" formControlName="rating" min="0" max="5" step="0.1">
          </mat-form-field>

          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Amenities</mat-label>
            <mat-chip-grid #chipGrid aria-label="Amenities selection">
              <mat-chip-row *ngFor="let amenity of amenities" (removed)="removeAmenity(amenity)">
                {{amenity}}
                <button matChipRemove>
                  <mat-icon>cancel</mat-icon>
                </button>
              </mat-chip-row>
              <input placeholder="New amenity..."
                     [matChipInputFor]="chipGrid"
                     [matChipInputSeparatorKeyCodes]="separatorKeysCodes"
                     (matChipInputTokenEnd)="addAmenity($event)">
            </mat-chip-grid>
          </mat-form-field>

          <div class="flex justify-end space-x-4">
            <button mat-button type="button" (click)="cancel()">Cancel</button>
            <button mat-raised-button color="primary" type="submit" [disabled]="!hotelForm.valid">
              Add Hotel
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
})
export class AddHotelComponent {
  hotelForm: FormGroup;
  amenities: string[] = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    private fb: FormBuilder,
    private hotelService: HotelService,
    private router: Router,
    private toast: HotToastService
  ) {
    this.hotelForm = this.fb.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      description: ['', Validators.required],
      imageUrl: ['', Validators.required],
      pricePerNight: ['', [Validators.required, Validators.min(0)]],
      rating: [0, [Validators.required, Validators.min(0), Validators.max(5)]],
    });
  }

  addAmenity(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.amenities.push(value);
    }
    event.chipInput!.clear();
  }

  removeAmenity(amenity: string): void {
    const index = this.amenities.indexOf(amenity);
    if (index >= 0) {
      this.amenities.splice(index, 1);
    }
  }

  cancel(): void {
    this.router.navigate(['/admin/dashboard']);
  }

  onSubmit(): void {
    if (this.hotelForm.valid) {
      const hotel = {
        ...this.hotelForm.value,
        amenities: this.amenities,
      };

      this.hotelService.addHotel(hotel).subscribe({
        next: () => {
          this.toast.success('Hotel added successfully');
          this.router.navigate(['/admin/dashboard']);
        },
        error: () => {
          this.toast.error('Failed to add hotel');
        },
      });
    }
  }
}

