export interface Booking {
  id: number;
  userId: number;
  hotelId: number;
  checkIn: Date;
  checkOut: Date;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  totalAmount: number;
  paymentStatus: 'pending' | 'paid' | 'failed';
  paymentId?: string;
  guestDetails: {
    fullName: string;
    email: string;
    phone: string;
  };
  specialRequests?: string;
  roomType: string;
  numberOfGuests: number;
  createdAt: Date;
}