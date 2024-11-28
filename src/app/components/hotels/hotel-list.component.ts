import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { HotelService, Hotel } from '../../services/hotel.service';

@Component({
  selector: 'app-hotel-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, RouterLink],
  template: `
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-8">Available Hotels</h1>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <mat-card *ngFor="let hotel of hotels" class="hotel-card">
          <img [src]="hotel.imageUrl" [alt]="hotel.name" class="w-full h-48 object-cover">
          <mat-card-content class="p-4">
            <div class="flex justify-between items-start mb-2">
              <h2 class="text-xl font-bold">{{hotel.name}}</h2>
              <div class="flex items-center">
                <mat-icon class="text-yellow-400">star</mat-icon>
                <span class="ml-1">{{hotel.rating}}</span>
              </div>
            </div>
            
            <p class="text-gray-600 mb-2">
              <mat-icon class="align-middle text-sm">location_on</mat-icon>
              {{hotel.location}}
            </p>
            
            <p class="text-gray-700 mb-4">{{hotel.description}}</p>
            
            <div class="flex flex-wrap gap-2 mb-4">
              <span *ngFor="let amenity of hotel.amenities" 
                    class="px-2 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
                {{amenity}}
              </span>
            </div>

            <div class="flex justify-between items-center">
              <span class="text-lg font-semibold text-primary-600">
                \${{hotel.pricePerNight}} / night
              </span>
              <button mat-raised-button color="primary" [routerLink]="['/user/hotels', hotel.id]">
                View Details
              </button>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .hotel-card {
      transition: transform 0.2s;
      &:hover {
        transform: translateY(-4px);
      }
    }
  `]
})
export class HotelListComponent implements OnInit {
  hotels: Hotel[] = [];

  constructor(private hotelService: HotelService) {}

  ngOnInit() {
    this.hotelService.getAllHotels().subscribe(hotels => {
      this.hotels = hotels;
    });
  }
}