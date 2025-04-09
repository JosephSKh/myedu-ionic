import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  navigate(url: string): void {
    window.location.href = url;
  }
} 