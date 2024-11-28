export interface Room {
  id: number;
  number: string;
  type: string;
  rate: number;
  status: 'available' | 'occupied' | 'maintenance';
  capacity: number;
}