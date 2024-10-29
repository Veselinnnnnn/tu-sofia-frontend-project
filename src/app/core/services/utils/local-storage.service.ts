import { Injectable } from '@angular/core';

@Injectable({
  providedIn: "root",
})
export class LocalStorageService {

  constructor() { }

  set(key: string, value: any): void {
    localStorage.setItem(key, value.toString());
  }

  get(key: string): any {
    return localStorage.getItem(key);
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }

  clear() {
    window.localStorage.clear();
  }
}
