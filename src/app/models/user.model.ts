export interface User {
  id: number;
  username: string;
  email: string;
  role: 'user' | 'admin';
  fullName: string;
}

export const MOCK_USERS = [
  {
    id: 1,
    username: 'admin',
    password: 'admin123', // In real app, passwords should be hashed
    email: 'admin@hotel.com',
    role: 'admin',
    fullName: 'Admin User'
  },
  {
    id: 2,
    username: 'user',
    password: 'user123',
    email: 'user@example.com',
    role: 'user',
    fullName: 'John Doe'
  }
] as const;