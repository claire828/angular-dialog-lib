import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DecorateOverlayRef, DialogEvent } from 'web/features/dialog';
import { SourceType } from '../../models/source.model';

type Subscription = {
  type: SourceType;
  name: string;
}

/**
 * Dialog component for adding user interest context.
 */
@Component({
  selector: 'app-dialog-add-interest',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="w-[400px] max-w-full p-8 bg-gradient-to-br from-white via-gray-50 to-blue-100 rounded-2xl shadow-2xl border border-blue-200 flex flex-col gap-6">
      <h2 class="text-2xl font-extrabold text-center text-blue-400 mb-2 tracking-wide">Add Your Interest Context</h2>
      <input
        class="border-2 border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 rounded-lg px-3 py-2 w-full text-lg transition-all placeholder-gray-400 bg-white shadow-sm"
        placeholder="Enter your interest..."
        [value]="interest()"
        (input)="interest.set($any($event.target).value)"
      />
      <div class="flex items-center gap-3">
        <label class="text-base font-medium text-gray-600">Type:</label>
        <select
          class="border-2 border-blue-200 focus:border-blue-400 rounded-lg px-3 py-2 w-full text-base bg-white shadow-sm"
          [value]="type()"
          (change)="type.set($any($event.target).value)"
        >
          @for (t of sourceTypes; track t) {
            <option [value]="t">{{ t | titlecase }}</option>
          }
        </select>
      </div>
      <div class="flex justify-center gap-4 mt-6">
        <button class="px-6 py-2 rounded-lg bg-blue-500 text-white font-semibold shadow hover:bg-blue-600 transition-all text-base tracking-wide" (click)="onConfirm()">Enter</button>
        <button class="px-6 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold shadow hover:bg-gray-300 transition-all text-base tracking-wide" (click)="onCancel()">Cancel</button>
      </div>
    </div>
  `,
})
export class DialogAddInterestComponent {
  interest = signal('');
  type = signal<SourceType>('youtube');
  readonly sourceTypes: SourceType[] = ['youtube', 'blog'];
  #ref = inject(DecorateOverlayRef<Subscription>);
  // #config = inject(DIALOG_COMPONENT_PROVIDER);

  onConfirm() {
    const data: Subscription = { name: this.interest(), type: this.type() };
    this.#ref.sendEvent({
      type: DialogEvent.Enter,
      data
    });
    this.#ref.close();
  }

  onCancel() {
    this.#ref.sendEvent({ type: DialogEvent.Cancel });
    this.#ref.close();
  }
}
