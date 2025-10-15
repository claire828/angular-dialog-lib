import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DialogService, MOCK_CONFIG } from 'web/features/dialog';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  constructor() { this.showDialog(); }

  public showDialog() {
    const service = inject(DialogService);
    const ref = service.openDefaultDialog(MOCK_CONFIG);
    const subscription = ref.event$.subscribe((event) => {
      console.log(event);
      // ref.close();
      subscription.unsubscribe();
    });
    // service.openComponentDialog(MOCK_CONFIG2);
  }
}
