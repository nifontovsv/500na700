export interface NewsItem {
  id: string;
  title: string;
  slug?: string;
  excerpt: string;
  body: string;
  date: string;
  image?: string;
}