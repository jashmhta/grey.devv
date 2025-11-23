export enum ServiceType {
  WEB_DEV = 'Web Development',
  APP_DEV = 'App Development',
  UI_UX = 'UI/UX Design',
  BRANDING = 'Branding Strategy'
}

export interface Project {
  id?: string;
  title: string;
  client: string;
  year: string;
  role: string;
  domain: string;
  category: string;
  description: string;
  img: string;
  tech: string[];
  price: string;
  demoUrl?: string;
  videoUrl?: string;
}

export interface Template {
  id: string;
  name: string;
  type: 'Mobile' | 'Desktop';
  contentUrl: string;
}