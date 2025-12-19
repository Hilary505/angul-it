import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly STORAGE_KEY = 'angul-it-captcha';

  setItem(key: string, value: any): void {
    localStorage.setItem(`${this.STORAGE_KEY}-${key}`, JSON.stringify(value));
  }

  getItem<T>(key: string): T | null {
    const item = localStorage.getItem(`${this.STORAGE_KEY}-${key}`);
    return item ? JSON.parse(item) : null;
  }

  removeItem(key: string): void {
    localStorage.removeItem(`${this.STORAGE_KEY}-${key}`);
  }

  clear(): void {
    Object.keys(localStorage)
      .filter(key => key.startsWith(this.STORAGE_KEY))
      .forEach(key => localStorage.removeItem(key));
  }
}