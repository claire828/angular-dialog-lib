import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';
import {
  DEFAULT_OVERLAY_CONFIG,
  DialogComponentConfig,
  DialogEvent,
  DialogService,
  MOCK_CONFIG,
} from 'dialog';
import { CustomDialogComponent, CustomDialogResult } from './custom-dialog/custom-dialog.component';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly dialogService = inject(DialogService);
  private readonly destroyRef = inject(DestroyRef);

  /**
   * Opens a default dialog with mock configuration
   */
  public showDefaultDialog(): void {
    const ref = this.dialogService.openDefaultDialog(MOCK_CONFIG);
    ref.event$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((event) => {
      console.log('Default Dialog event:', event);
    });
  }

  /**
   * Opens a custom component dialog with form inputs
   */
  public showCustomDialog(): void {
    const config: DialogComponentConfig = {
      injectorID: 'custom-dialog',
      componentRef: () => CustomDialogComponent,
      overlayConfig: DEFAULT_OVERLAY_CONFIG,
      autoClose: true,
      data: {
        name: 'John Doe',
        email: 'john@example.com',
      },
    };

    const ref = this.dialogService.openComponentDialog<CustomDialogResult>(config);

    ref.event$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((event) => {
      console.log('Custom Dialog event:', event);

      if (event.type === DialogEvent.Enter && event.data) {
        console.log('Form submitted successfully:', event.data.formData);
        console.log('Timestamp:', new Date(event.data.timestamp).toLocaleString());
      } else if (event.type === DialogEvent.Cancel) {
        console.log('Dialog cancelled');
      }
    });
  }
}
