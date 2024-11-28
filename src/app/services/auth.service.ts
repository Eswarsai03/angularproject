import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { User, MOCK_USERS } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private router: Router) {
    // Check localStorage for existing session
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser));
    }
  }

  login(username: string, password: string): Observable<User> {
    return new Observable(subscriber => {
      const user = MOCK_USERS.find(
        u => u.username === username && u.password === password
      );

      if (user) {
        const { password: _, ...userWithoutPassword } = user;
        this.currentUserSubject.next(userWithoutPassword);
        localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
        subscriber.next(userWithoutPassword);
        subscriber.complete();
      } else {
        subscriber.error('Invalid username or password');
      }
    });
  }

  logout(): void {
    this.currentUserSubject.next(null);
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  isAdmin(): boolean {
    return this.currentUserSubject.value?.role === 'admin';
  }
}