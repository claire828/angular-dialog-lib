import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { ContentItem } from '../../models';

/**
 * Component to display content item cards
 */
@Component({
  selector: 'app-content-card',
  imports: [CommonModule, NgOptimizedImage],
  template: `
    <div class="bg-card rounded-lg shadow overflow-hidden">
      <img [src]="item().thumbnail" [alt]="item().title" class="w-full h-48 object-cover" />
      <div class="p-4">
        <div class="flex justify-between items-start mb-2">
          <h3 class="font-medium text-lg">
            {{ displayTitle() }}
          </h3>
          <span class="text-sm text-gray-500">{{ item().date }}</span>
        </div>
        <p class="text-sm text-gray-600 mb-3">
          {{ displaySummary() }}
        </p>
        <div class="flex flex-wrap gap-2 mb-4">
          @for(tag of item().tags; track tag){
            <span class="color-secondary text-dark text-xs px-2 py-1 rounded-full flex items-center" >
              <img alt="tag icon" width="12" height="12" src="/assets/tag.svg" class="mr-1" />
              {{ tag }}
           </span>
          }
        </div>
        <div class="flex justify-between items-center">
          <span class="text-sm text-gray-500">{{ item().source }}</span>
          <a
            [href]="item().url"
            target="_blank"
            rel="noopener noreferrer"
            class="text-accent hover:text-green-600 text-sm flex items-center"
          >
            <img alt="view original" [width]="16" [height]="16" ngSrc="/assets/book-open.svg" class="mx-1" />
            View Original
          </a>
        </div>
      </div>
    </div>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentCardComponent {
  public readonly item = input.required<ContentItem>();
  public readonly showTranslation = input.required<boolean>();

  protected readonly displayTitle = computed(() =>
    this.showTranslation() && this.item().translatedTitle
      ? this.item().translatedTitle
      : this.item().title
  );

  protected readonly displaySummary = computed(() =>
    this.showTranslation() && this.item().translatedSummary
      ? this.item().translatedSummary
      : this.item().summary
  );

  protected getDisplaySummary = computed(() => this.showTranslation() && this.item().translatedSummary ? this.item().translatedSummary : this.item().summary);

}
