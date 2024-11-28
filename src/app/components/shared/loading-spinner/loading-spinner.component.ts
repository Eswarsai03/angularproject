import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  template: `
    <div class="flex justify-center items-center h-full">
      <mat-spinner diameter="40"></mat-spinner>
    </div>
  `
})
export class LoadingSpinnerComponent {}