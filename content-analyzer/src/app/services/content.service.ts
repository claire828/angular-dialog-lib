import { httpResource } from '@angular/common/http';
import { Injectable, computed } from '@angular/core';
import { patchState, signalState } from '@ngrx/signals';
import { ContentItem, Source, SourceType } from '../models';

interface Subscription {
  id: string;
  type: SourceType;
  name: string;
}

interface ContentState {
  sources: Source[];
  content: ContentItem[];
}

const initialState: ContentState = {
  sources: [{
    id: '1',
    name: 'Youtube Channel',
    type: 'youtube',
  }, {
    id: '2',
    name: 'Blog',
    type: 'blog',
  }
  ],
  content: [{
    id: '1',
    title: 'Latest AI Technology Explained',
    source: 'Youtube Channel',
    date: '2025-06-28',
    summary: 'This video details the latest advancements in AI technology and applications',
    tags: ['AI', 'Technology'],
    url: 'https://youtube.com/watch?v=123',
    thumbnail: 'https://picsum.photos/300/200?random=1'
  },
  ]
};

/**
 * Service to manage content items and sources using NgRx Signal State
 */
@Injectable({
  providedIn: 'root'
})
export class ContentService {
  readonly #state = signalState(initialState);
  readonly sources = computed(() => this.#state.sources());
  readonly content = computed(() => this.#state.content());
  public readonly allSubscriptions = httpResource<Subscription[]>('http://localhost:54321/content/all').asReadonly();

  /**
   * Add new content item
   */
  addContentItem(item: ContentItem): void {
    patchState(this.#state, {
      content: [...this.#state.content(), item]
    });
  }

  /**
   * Fetch updates and add new content
   */
  fetchUpdates(): void {
    const newContent: ContentItem = {
      id: Date.now().toString(),
      title: 'New JavaScript Features',
      source: 'Youtube Channel',
      date: '2025-07-01',
      summary: 'Overview of upcoming JavaScript features in ES2025',
      tags: ['JavaScript', 'Programming'],
      url: 'https://youtube.com/watch?v=456',
      thumbnail: 'https://picsum.photos/300/200?random=3'
    };
    this.addContentItem(newContent);
  }

  /**
   * Add new source
   */
  addSource(source: Source): void {
    patchState(this.#state, {
      sources: [...this.#state.sources(), source]
    });
  }

}
