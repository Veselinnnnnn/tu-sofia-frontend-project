import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LocalStorageService} from "../utils/local-storage.service";
import {Router} from "@angular/router";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  private baseRoute: string = "api/auth";

  constructor(
    private localStorageService: LocalStorageService,
    private http: HttpClient,
    private router: Router
  ) { }

  public forgotPassword(email: string): Observable<void> {
    return this.http.post<void>(`${this.baseRoute}/forgot-password`, { email });
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post<any>(`${this.baseRoute}/reset-password`, { token, newPassword });
  }

  public isAuthenticated() {
    const isAuthenticated = new Date() < this.getExpiration();
    if(!isAuthenticated) {
      this.navigateToLoginPage();
    }

    return isAuthenticated;
  }

  public getToken() {
    return localStorage.getItem('token');
  }

  public logout() {
    this.localStorageService.clear();
  }

  public navigateToLoginPage() {
    this.logout();
    this.router.navigateByUrl('/authentication/login');
  }

  private getExpiration() {
    const expiration = this.localStorageService.get('expires_at');

    if(!expiration) {
      return (new Date).setHours(new Date().getHours() - 1);
    }

    return new Date(expiration);
  }
}
