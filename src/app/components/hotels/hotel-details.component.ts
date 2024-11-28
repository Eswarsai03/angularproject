import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { HotelService, Hotel } from '../../services/hotel.service';
import { BookingFormComponent } from '../booking/booking-form.component';

@Component({
  selector: 'app-hotel-details',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    RouterLink,
    BookingFormComponent
  ],
  template: `
    <div class="min-h-screen bg-gray-50">
      <div class="container mx-auto px-4 py-8" *ngIf="hotel">
        <!-- Hotel Images Gallery -->
        <div class="grid grid-cols-3 gap-4 mb-8">
          <div class="col-span-2">
            <img [src]="hotel.imageUrl" [alt]="hotel.name" 
                 class="w-full h-[500px] object-cover rounded-lg shadow-lg">
          </div>
          <div class="grid grid-rows-2 gap-4">
            <img [src]="hotel.imageUrl" [alt]="hotel.name" 
                 class="w-full h-full object-cover rounded-lg shadow-lg">
            <img [src]="hotel.imageUrl" [alt]="hotel.name" 
                 class="w-full h-full object-cover rounded-lg shadow-lg">
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Hotel Details -->
          <div class="lg:col-span-2">
            <mat-card class="mb-8">
              <mat-card-content class="p-6">
                <div class="flex justify-between items-start mb-6">
                  <div>
                    <h1 class="text-3xl font-bold text-gray-900">{{hotel.name}}</h1>
                    <p class="text-gray-600 flex items-center mt-2">
                      <mat-icon class="mr-1">location_on</mat-icon>
                      {{hotel.location}}
                    </p>
                  </div>
                  <div class="flex items-center bg-primary-50 px-4 py-2 rounded-full">
                    <mat-icon class="text-yellow-400">star</mat-icon>
                    <span class="ml-1 font-bold text-lg">{{hotel.rating}}</span>
                  </div>
                </div>

                <mat-tab-group class="hotel-tabs">
                  <mat-tab label="Overview">
                    <div class="p-6">
                      <h2 class="text-xl font-bold mb-4">About this hotel</h2>
                      <p class="text-gray-700 mb-8 leading-relaxed">{{hotel.description}}</p>
                      
                      <h3 class="text-lg font-bold mb-4">Amenities</h3>
                      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div *ngFor="let amenity of hotel.amenities" 
                             class="flex items-center text-gray-700">
                          <mat-icon class="text-primary-500 mr-2">check_circle</mat-icon>
                          <span>{{amenity}}</span>
                        </div>
                      </div>
                    </div>
                  </mat-tab>
                  
                  <mat-tab label="Location">
                    <div class="p-6">
                      <h2 class="text-xl font-bold mb-4">Location Details</h2>
                      <p class="text-gray-700 mb-4">{{hotel.location}}</p>
                      <div class="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
                        <p class="text-gray-500">Map view coming soon...</p>
                      </div>
                    </div>
                  </mat-tab>
                  
                  <mat-tab label="Reviews">
                    <div class="p-6">
                      <h2 class="text-xl font-bold mb-4">Guest Reviews</h2>
                      <div class="text-center py-8">
                        <mat-icon class="text-4xl text-gray-400">rate_review</mat-icon>
                        <p class="text-gray-500 mt-2">Reviews coming soon...</p>
                      </div>
                    </div>
                  </mat-tab>
                </mat-tab-group>
              </mat-card-content>
            </mat-card>
          </div>

          <!-- Booking Card -->
          <div class="lg:col-span-1">
            <mat-card class="sticky top-8">
              <mat-card-content class="p-6">
                <div class="text-center mb-6">
                  <div class="text-3xl font-bold text-primary-600">\${{hotel.pricePerNight}}</div>
                  <p class="text-gray-600">per night</p>
                </div>

                <app-booking-form [hotelId]="hotel.id"></app-booking-form>
              </mat-card-content>
            </mat-card>
          </div>
        </div>
      </div>
    </div>
  `
})
export class HotelDetailsComponent implements OnInit {
  hotel: Hotel | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private hotelService: HotelService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.hotelService.getHotelById(id).subscribe(hotel => {
        if (hotel) {
          this.hotel = hotel;
        } else {
          this.router.navigate(['/user/hotels']);
        }
      });
    });
  }
}