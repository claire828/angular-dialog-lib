import { CommonModule, NgOptimizedImage } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, inject, input, ResourceStatus } from '@angular/core';
import { tap } from 'rxjs';
import { DEFAULT_OVERLAY_CONFIG, DialogComponentConfig, DialogService } from 'web/features/dialog';
import { Source, SourceType } from '../../models';
import { ContentService } from '../../services';
import { DialogAddInterestComponent } from '../dialog-add-interest/dialog-add-interest.component';

type Subscription = {
  type: SourceType;
  name: string;
}

const dialogAddInterest: DialogComponentConfig = {
  injectorID: 'a2',
  componentRef: () => DialogAddInterestComponent,
  overlayConfig: DEFAULT_OVERLAY_CONFIG,
}

/**
 * Component to display subscription sources
 */
@Component({
  selector: 'app-subscription-card',
  imports: [CommonModule, NgOptimizedImage],
  template: `
    <div class="bg-card rounded-lg shadow p-4 flex items-center justify-between">
      <div>
        <h3 class="font-medium">{{ source().name }}</h3>
        @if(contentService.allSubscriptions.isLoading()){
          <p class="text-sm text-gray-500">Loading subscriptions...</p>
        }@else if(!contentService.allSubscriptions.hasValue()){
           <p class="text-sm text-gray-500">no subscription</p>
        }@else {
          @for(subscription of subscriptions(); track subscription.id){
            <p class="text-sm text-gray-500">
                {{ subscription.name }}
            </p>
          }
        }
      
      </div>
      <button class="text-accent cursor-pointer hover:bg-gray-100 p-2 rounded-full transition-colors" (click)="onClick(source().type)" >
        <img alt="add" width="20" [height]="20" ngSrc="/assets/add.svg" />
      </button>
    </div>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubscriptionCardComponent {
  public source = input.required<Source>();
  protected readonly dialogService = inject(DialogService);
  protected readonly httpClient = inject(HttpClient);
  protected readonly contentService = inject(ContentService);
  protected readonly resource = ResourceStatus;
  protected readonly subscriptions = computed(() => this.contentService.allSubscriptions.value()?.filter(sub => sub.type === this.source().type) || []);

  protected onClick(type: SourceType): void {
    const ref = this.dialogService.openComponentDialog<Subscription>(dialogAddInterest);
    const subscription = ref.event$.subscribe((event) => {
      if (event.type === 'Enter' && event.data) {
        // event.data is now strongly typed as Subscription
        console.log('User input:', event.data);
        this.httpClient.post('http://localhost:54321/content/create', event.data)
          .pipe(
            tap(() => this.contentService.allSubscriptions.reload())
          ).subscribe();
      }
      ref.close();
      subscription.unsubscribe();
    });
    console.log('Add source clicked', type);
  }
}
