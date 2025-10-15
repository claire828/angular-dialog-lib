/**
 * Content item model representing analyzed content from various sources
 */
export interface ContentItem {
  id: string;
  title: string;
  source: string;
  date: string;
  summary: string;
  tags: string[];
  translatedTitle?: string;
  translatedSummary?: string;
  url: string;
  thumbnail: string;
}
