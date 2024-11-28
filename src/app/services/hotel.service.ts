import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Hotel {
  id: number;
  name: string;
  location: string;
  description: string;
  imageUrl: string;
  pricePerNight: number;
  rating: number;
  amenities: string[];
  additionalImages?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private mockHotels: Hotel[] = [
    {
      id: 1,
      name: 'Grand Hotel Plaza',
      location: 'New York City, NY',
      description: 'Experience luxury at its finest in the heart of Manhattan. Our 5-star hotel offers breathtaking city views, world-class dining, and unparalleled service.',
      imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
      pricePerNight: 599,
      rating: 4.8,
      amenities: ['Free WiFi', 'Spa & Wellness Center', 'Rooftop Pool', 'Fine Dining Restaurant', '24/7 Room Service', 'Fitness Center'],
      additionalImages: [
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b',
        'https://images.unsplash.com/photo-1584132967334-10e028bd69f7'
      ]
    },
    {
      id: 2,
      name: 'Oceanfront Paradise Resort',
      location: 'Miami Beach, FL',
      description: 'Immerse yourself in luxury beachfront living with pristine white sand beaches, crystal-clear waters, and spectacular ocean views from every room.',
      imageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4',
      pricePerNight: 799,
      rating: 4.9,
      amenities: ['Private Beach Access', 'Infinity Pool', 'Beach Club', 'Water Sports', 'Oceanfront Dining', 'Luxury Spa'],
      additionalImages: [
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d',
        'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9'
      ]
    },
    {
      id: 3,
      name: 'Alpine Lodge & Spa',
      location: 'Aspen, CO',
      description: 'A luxurious mountain retreat offering the perfect blend of rustic charm and modern luxury, with direct access to world-class skiing and mountain activities.',
      imageUrl: 'https://images.unsplash.com/photo-1521783988139-89397d761dce',
      pricePerNight: 899,
      rating: 4.7,
      amenities: ['Ski-in/Ski-out Access', 'Hot Springs', 'Mountain View Rooms', 'Gourmet Restaurant', 'Fireplace Lounge', 'Spa Treatments'],
      additionalImages: [
        'https://images.unsplash.com/photo-1548843222-4d6986445718',
        'https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd'
      ]
    },
    {
      id: 4,
      name: 'Desert Oasis Resort',
      location: 'Scottsdale, AZ',
      description: 'An exclusive desert retreat featuring stunning architecture, world-class golf courses, and spectacular desert views in a serene setting.',
      imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd',
      pricePerNight: 699,
      rating: 4.6,
      amenities: ['Golf Course', 'Desert Tours', 'Infinity Pools', 'Spa & Wellness', 'Tennis Courts', 'Sunset Terrace'],
      additionalImages: [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b'
      ]
    },
    {
      id: 5,
      name: 'Vineyard Estate Hotel',
      location: 'Napa Valley, CA',
      description: 'Nestled in the heart of wine country, offering exclusive wine tastings, culinary experiences, and breathtaking vineyard views.',
      imageUrl: 'https://images.unsplash.com/photo-1615460549969-36fa19521a4f',
      pricePerNight: 899,
      rating: 4.9,
      amenities: ['Wine Tastings', 'Michelin-Star Restaurant', 'Spa Services', 'Cooking Classes', 'Vineyard Tours', 'Private Terraces'],
      additionalImages: [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b'
      ]
    }
  ];

  getFeaturedHotels(): Observable<Hotel[]> {
    return of(this.mockHotels);
  }

  getAllHotels(): Observable<Hotel[]> {
    return of(this.mockHotels);
  }

  getHotelById(id: number): Observable<Hotel | undefined> {
    return of(this.mockHotels.find(hotel => hotel.id === id));
  }

  addHotel(hotel: Omit<Hotel, 'id'>): Observable<Hotel> {
    const newHotel = {
      ...hotel,
      id: this.mockHotels.length + 1
    };
    this.mockHotels.push(newHotel);
    return of(newHotel);
  }
}