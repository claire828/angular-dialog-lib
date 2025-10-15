/**
 * Source model representing content sources like YouTube channels or blogs
 */

export type SourceType = 'youtube' | 'blog';
export interface Source {
  id: string;
  name: string;
  type: SourceType;
}