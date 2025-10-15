import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DialogService, MOCK_CONFIG } from 'dialog';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly dialogService = inject(DialogService);

  /**
   * Opens a default dialog with mock configuration
   */
  public showDialog(): void {
    const ref = this.dialogService.openDefaultDialog(MOCK_CONFIG);
    const subscription = ref.event$.subscribe((event) => {
      console.log('Dialog event:', event);
      subscription.unsubscribe();
    });
  }
}
