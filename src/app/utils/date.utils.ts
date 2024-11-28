import { format, differenceInDays } from 'date-fns';

export const formatDate = (date: Date): string => {
  return format(date, 'MMM dd, yyyy');
};

export const calculateNights = (checkIn: Date, checkOut: Date): number => {
  return differenceInDays(checkOut, checkIn);
};

export const calculateTotalAmount = (rate: number, nights: number): number => {
  return rate * nights;
};