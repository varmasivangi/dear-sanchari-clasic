import { Injectable, Inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

export interface SeoData {
  title: string;
  description: string;
  author?: string;
  keywords?: string;
  type?: string;
  image?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  constructor(
    private titleService: Title,
    private metaService: Meta,
    @Inject(DOCUMENT) private dom: Document
  ) {}

  updateSeoData(data: SeoData): void {
    // Set Title
    this.titleService.setTitle(data.title);

    // Set Meta Description
    this.metaService.updateTag({ name: 'description', content: data.description });

    // Set Optional Tags
    if (data.author) this.metaService.updateTag({ name: 'author', content: data.author });
    if (data.keywords) this.metaService.updateTag({ name: 'keywords', content: data.keywords });

    // Set Open Graph Tags
    this.metaService.updateTag({ property: 'og:title', content: data.title });
    this.metaService.updateTag({ property: 'og:description', content: data.description });
    if (data.type) this.metaService.updateTag({ property: 'og:type', content: data.type });
    if (data.image) this.metaService.updateTag({ property: 'og:image', content: data.image });
    
    // Twitter Card Tags
    this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.metaService.updateTag({ name: 'twitter:title', content: data.title });
    this.metaService.updateTag({ name: 'twitter:description', content: data.description });
    if (data.image) this.metaService.updateTag({ name: 'twitter:image', content: data.image });
  }

  updateCanonicalUrl(url: string): void {
    const head = this.dom.getElementsByTagName('head')[0];
    let element: HTMLLinkElement | null = this.dom.querySelector(`link[rel='canonical']`) || null;
    
    if (!element) {
      element = this.dom.createElement('link') as HTMLLinkElement;
      element.setAttribute('rel', 'canonical');
      head.appendChild(element);
    }
    element.setAttribute('href', url);
  }
}
