import { CommonModule } from '@angular/common';
import { Component, inject, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  DecorateOverlayRef,
  DIALOG_COMPONENT_PROVIDER,
  DialogComponentConfig,
  DialogEvent,
} from 'dialog';

/**
 * Custom dialog component demonstrating form input and type-safe data return
 */
@Component({
  selector: 'app-custom-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="fixed inset-0 flex items-center justify-center p-4">
      <div class="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <!-- Header -->
        <div class="mb-4">
          <h2 class="text-2xl font-bold text-gray-800">Custom Dialog</h2>
          <p class="mt-1 text-sm text-gray-600">Enter your information below</p>
        </div>

        <!-- Content -->
        <div class="mb-6 space-y-4">
          <div>
            <label for="name" class="mb-1 block text-sm font-medium text-gray-700"> Name </label>
            <input
              id="name"
              type="text"
              [(ngModel)]="formData.name"
              class="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label for="email" class="mb-1 block text-sm font-medium text-gray-700"> Email </label>
            <input
              id="email"
              type="email"
              [(ngModel)]="formData.email"
              class="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label for="message" class="mb-1 block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              id="message"
              [(ngModel)]="formData.message"
              rows="3"
              class="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your message"
            ></textarea>
          </div>
        </div>

        <!-- Footer Buttons -->
        <div class="flex justify-end gap-3">
          <button
            type="button"
            (click)="onCancel()"
            class="rounded-md bg-gray-200 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:outline-none"
          >
            Cancel
          </button>
          <button
            type="button"
            (click)="onSubmit()"
            [disabled]="!isValid()"
            class="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class CustomDialogComponent {
  private readonly overlayRef = inject(DecorateOverlayRef<CustomDialogResult>);

  public formData: CustomDialogFormData = {
    name: '',
    email: '',
    message: '',
  };

  constructor(
    @Inject(DIALOG_COMPONENT_PROVIDER)
    public config: DialogComponentConfig<any, CustomDialogData>
  ) {
    // Initialize form with data passed from parent if available
    if (config.data) {
      this.formData = { ...this.formData, ...config.data };
    }
  }

  /**
   * Validates form data
   */
  public isValid(): boolean {
    return (
      this.formData.name.trim().length > 0 &&
      this.formData.email.trim().length > 0 &&
      this.formData.email.includes('@')
    );
  }

  /**
   * Handles form submission
   */
  public onSubmit(): void {
    if (this.isValid()) {
      this.overlayRef.sendEvent({
        type: DialogEvent.Enter,
        data: {
          success: true,
          formData: this.formData,
          timestamp: Date.now(),
        },
      });
    }
  }

  /**
   * Handles cancel action
   */
  public onCancel(): void {
    this.overlayRef.sendEvent({
      type: DialogEvent.Cancel,
      data: {
        success: false,
        formData: this.formData,
        timestamp: Date.now(),
      },
    });
  }
}

/**
 * Interface for data passed into the dialog
 */
export interface CustomDialogData {
  name?: string;
  email?: string;
  message?: string;
}

/**
 * Interface for form data within the dialog
 */
export interface CustomDialogFormData {
  name: string;
  email: string;
  message: string;
}

/**
 * Interface for data returned from the dialog
 */
export interface CustomDialogResult {
  success: boolean;
  formData: CustomDialogFormData;
  timestamp: number;
}
