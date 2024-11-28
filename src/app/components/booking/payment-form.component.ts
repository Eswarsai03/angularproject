import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PaymentService } from '../../services/payment.service';
import { HotToastService } from '@ngneat/hot-toast';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-payment-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  template: `
    <div class="bg-white rounded-lg shadow-lg p-6">
      <h2 class="text-2xl font-bold mb-6">Payment Details</h2>
      
      <form [formGroup]="paymentForm" (ngSubmit)="onSubmit()" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Card Number</mat-label>
            <input matInput formControlName="cardNumber" placeholder="1234 5678 9012 3456">
            <mat-icon matSuffix>credit_card</mat-icon>
            <mat-error *ngIf="paymentForm.get('cardNumber')?.hasError('required')">
              Card number is required
            </mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Card Holder Name</mat-label>
            <input matInput formControlName="cardHolder" placeholder="John Doe">
            <mat-error *ngIf="paymentForm.get('cardHolder')?.hasError('required')">
              Card holder name is required
            </mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Expiry Date</mat-label>
            <input matInput formControlName="expiryDate" placeholder="MM/YY">
            <mat-error *ngIf="paymentForm.get('expiryDate')?.hasError('required')">
              Expiry date is required
            </mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>CVV</mat-label>
            <input matInput formControlName="cvv" type="password" maxlength="4">
            <mat-error *ngIf="paymentForm.get('cvv')?.hasError('required')">
              CVV is required
            </mat-error>
          </mat-form-field>
        </div>

        <div class="border-t pt-6">
          <div class="flex justify-between items-center mb-4">
            <span class="text-gray-600">Total Amount:</span>
            <span class="text-2xl font-bold text-primary-600">\${{amount}}</span>
          </div>
          
          <button mat-raised-button color="primary" 
                  class="w-full py-6" 
                  type="submit"
                  [disabled]="paymentForm.invalid || processing">
            <mat-icon *ngIf="!processing">lock</mat-icon>
            <span *ngIf="!processing">Pay Now</span>
            <mat-spinner diameter="24" *ngIf="processing"></mat-spinner>
          </button>
        </div>
      </form>
    </div>
  `
})
export class PaymentFormComponent {
  @Input() amount: number = 0;
  @Output() paymentComplete = new EventEmitter<boolean>();
  
  paymentForm: FormGroup;
  processing = false;

  constructor(
    private fb: FormBuilder,
    private paymentService: PaymentService,
    private toast: HotToastService
  ) {
    this.paymentForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
      cardHolder: ['', Validators.required],
      expiryDate: ['', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])\/([0-9]{2})$')]],
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3,4}$')]]
    });
  }

  async onSubmit() {
    if (this.paymentForm.valid) {
      this.processing = true;
      try {
        const paymentIntentId = await this.paymentService.createPaymentIntent(this.amount);
        const success = await this.paymentService.processPayment(paymentIntentId, this.paymentForm.value);
        
        if (success) {
          this.toast.success('Payment processed successfully!');
          this.paymentComplete.emit(true);
        } else {
          throw new Error('Payment failed');
        }
      } catch (error) {
        this.toast.error('Payment failed. Please try again.');
        this.paymentComplete.emit(false);
      } finally {
        this.processing = false;
      }
    }
  }
}