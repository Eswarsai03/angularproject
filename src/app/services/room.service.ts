import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Room } from '../models/room.model';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private rooms: Room[] = [
    { id: 1, number: '101', type: 'Standard', rate: 100, status: 'available', capacity: 2 },
    { id: 2, number: '102', type: 'Deluxe', rate: 150, status: 'available', capacity: 3 },
  ];

  getRooms(): Observable<Room[]> {
    return of(this.rooms);
  }

  updateRoomStatus(roomId: number, status: 'available' | 'occupied' | 'maintenance'): Observable<Room> {
    const room = this.rooms.find(r => r.id === roomId);
    if (room) {
      room.status = status;
      return of(room);
    }
    throw new Error('Room not found');
  }
}