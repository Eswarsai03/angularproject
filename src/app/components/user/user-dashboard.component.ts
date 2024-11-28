import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { HotelService } from '../../services/hotel.service';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, RouterLink],
  template: `
    <div class="min-h-screen bg-gray-50">
      <div class="container mx-auto px-4 py-8">
        <!-- Hero Section -->
        <div class="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 mb-12 text-white">
          <h1 class="text-4xl font-bold mb-4">Welcome to Luxury Hotels</h1>
          <p class="text-xl opacity-90 mb-6">Discover comfort and elegance at our handpicked hotels</p>
          <button mat-raised-button color="accent" routerLink="/user/hotels" class="px-6 py-2">
            Browse All Hotels
          </button>
        </div>

        <!-- Featured Hotels -->
        <h2 class="text-2xl font-bold mb-6">Featured Hotels</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <mat-card *ngFor="let hotel of featuredHotels" class="hotel-card">
            <img [src]="hotel.imageUrl" [alt]="hotel.name" class="w-full h-64 object-cover">
            <mat-card-content class="p-6">
              <div class="flex justify-between items-start mb-4">
                <div>
                  <h3 class="text-xl font-bold text-gray-900">{{hotel.name}}</h3>
                  <p class="text-gray-600">
                    <mat-icon class="align-middle text-sm">location_on</mat-icon>
                    {{hotel.location}}
                  </p>
                </div>
                <div class="flex items-center bg-primary-50 px-3 py-1 rounded-full">
                  <mat-icon class="text-yellow-400 text-sm">star</mat-icon>
                  <span class="ml-1 font-semibold">{{hotel.rating}}</span>
                </div>
              </div>
              
              <div class="flex flex-wrap mb-4">
                <span *ngFor="let amenity of hotel.amenities.slice(0, 3)" class="amenity-badge">
                  {{amenity}}
                </span>
              </div>

              <div class="flex justify-between items-center">
                <div>
                  <span class="text-2xl font-bold text-primary-600">\${{hotel.pricePerNight}}</span>
                  <span class="text-gray-600">/night</span>
                </div>
                <button mat-raised-button color="primary" [routerLink]="['/user/hotels', hotel.id]">
                  View Details
                </button>
              </div>
            </mat-card-content>
          </mat-card>
        </div>

        <!-- Quick Actions -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="quick-action-card">
            <mat-icon class="text-4xl text-primary-500 mb-4">search</mat-icon>
            <h3 class="text-xl font-bold mb-2">Find Hotels</h3>
            <p class="text-gray-600 mb-4">Search from our curated selection of luxury hotels worldwide.</p>
            <button mat-stroked-button color="primary" routerLink="/user/hotels">
              Browse Hotels
            </button>
          </div>

          <div class="quick-action-card">
            <mat-icon class="text-4xl text-primary-500 mb-4">book_online</mat-icon>
            <h3 class="text-xl font-bold mb-2">My Bookings</h3>
            <p class="text-gray-600 mb-4">View and manage your current and upcoming reservations.</p>
            <button mat-stroked-button color="primary" routerLink="/user/bookings">
              View Bookings
            </button>
          </div>

          <div class="quick-action-card">
            <mat-icon class="text-4xl text-primary-500 mb-4">support_agent</mat-icon>
            <h3 class="text-xl font-bold mb-2">24/7 Support</h3>
            <p class="text-gray-600 mb-4">Our dedicated team is here to assist you anytime.</p>
            <button mat-stroked-button color="primary">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class UserDashboardComponent implements OnInit {
  featuredHotels: any[] = [];

  constructor(private hotelService: HotelService) {}

  ngOnInit() {
    this.hotelService.getFeaturedHotels().subscribe(hotels => {
      this.featuredHotels = hotels;
    });
  }
}