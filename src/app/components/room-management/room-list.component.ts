import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RoomService } from '../../services/room.service';
import { Room } from '../../models/room.model';

@Component({
  selector: 'app-room-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule],
  template: `
    <div class="container">
      <h2 class="text-2xl font-bold mb-6">Room Management</h2>
      <table mat-table [dataSource]="rooms" class="mat-elevation-z4 w-full">
        <ng-container matColumnDef="number">
          <th mat-header-cell *matHeaderCellDef>Room Number</th>
          <td mat-cell *matCellDef="let room">{{room.number}}</td>
        </ng-container>

        <ng-container matColumnDef="type">
          <th mat-header-cell *matHeaderCellDef>Type</th>
          <td mat-cell *matCellDef="let room">{{room.type}}</td>
        </ng-container>

        <ng-container matColumnDef="rate">
          <th mat-header-cell *matHeaderCellDef>Rate</th>
          <td mat-cell *matCellDef="let room">{{room.rate | currency}}</td>
        </ng-container>

        <ng-container matColumnDef="status">
          <th mat-header-cell *matHeaderCellDef>Status</th>
          <td mat-cell *matCellDef="let room">
            <span class="status-badge" [ngClass]="'status-' + room.status.toLowerCase()">
              {{room.status}}
            </span>
          </td>
        </ng-container>

        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef>Actions</th>
          <td mat-cell *matCellDef="let room">
            <button mat-icon-button color="primary" (click)="updateStatus(room)">
              <mat-icon>edit</mat-icon>
            </button>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
    </div>
  `
})
export class RoomListComponent implements OnInit {
  rooms: Room[] = [];
  displayedColumns: string[] = ['number', 'type', 'rate', 'status', 'actions'];

  constructor(private roomService: RoomService) {}

  ngOnInit() {
    this.loadRooms();
  }

  loadRooms() {
    this.roomService.getRooms().subscribe(rooms => {
      this.rooms = rooms;
    });
  }

  updateStatus(room: Room) {
    const newStatus = room.status === 'available' ? 'maintenance' : 'available';
    this.roomService.updateRoomStatus(room.id, newStatus).subscribe(() => {
      this.loadRooms();
    });
  }
}