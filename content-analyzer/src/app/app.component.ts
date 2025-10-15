import { CommonModule, NgOptimizedImage } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CoreIconButtonComponent } from 'core-ui-kit';
import { ContentCardComponent, SubscriptionCardComponent } from './components';
import { ContentService } from './services';

/**
 * Main application component for content analyzer
 */
@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    SubscriptionCardComponent,
    ContentCardComponent,
    CoreIconButtonComponent,
    NgOptimizedImage
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class AppComponent {
  protected readonly title = 'Content Analyzer';
  protected contentService = inject(ContentService);
  protected showTranslation = signal(false);
  protected readonly testResource = httpResource('http://localhost:54321/content/refresh');

  /**
   * Fetch new content updates
   */
  onFetchUpdates(): void {
    this.contentService.fetchUpdates();
  }

  /**
   * Toggle translation display
   */
  onToggleTranslation(): void {
    this.showTranslation.update(value => !value);
    this.testResource.reload();
  }

  /**
   * Add new source (placeholder functionality)
   */
  onAddSource(): void {
    // Placeholder for add source functionality
    console.log('Add source clicked');
  }
}
