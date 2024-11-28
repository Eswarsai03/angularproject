import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { UserDashboardComponent } from './components/user/user-dashboard.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard.component';
import { HotelListComponent } from './components/hotels/hotel-list.component';
import { HotelDetailsComponent } from './components/hotels/hotel-details.component';
import { BookingHistoryComponent } from './components/user/booking-history.component';
import { AddHotelComponent } from './components/admin/add-hotel.component';
import { ReportsComponent } from './components/admin/reports.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { 
    path: 'user',
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: UserDashboardComponent },
      { path: 'hotels', component: HotelListComponent },
      { path: 'hotels/:id', component: HotelDetailsComponent },
      { path: 'bookings', component: BookingHistoryComponent }
    ]
  },
  {
    path: 'admin',
    canActivate: [AuthGuard, AdminGuard],
    children: [
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'hotels/add', component: AddHotelComponent },
      { path: 'reports', component: ReportsComponent }
    ]
  }
];