import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApplicationResponse } from '../../model/application/ApplicationResponse.model';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private baseUrl = '/api/application';

  constructor(
    private http: HttpClient
  ) {
  }

  create(applicationPayload: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, applicationPayload);
  }

  delete(id: number): Observable<void> {
    const params = new HttpParams()
      .set("id", id);

    return this.http.delete<void>(`${this.baseUrl}`, {params});
  }

  update(applicationId: number, applicationPayload: any): Observable<ApplicationResponse> {
    const params = new HttpParams()
      .set("id", applicationId);

    return this.http.put<ApplicationResponse>(`${this.baseUrl}`, applicationPayload, {params});
  }

  getAllByUser(user: number): Observable<ApplicationResponse[]> {
    const params = new HttpParams()
      .set("userId", user);

    return this.http.get<ApplicationResponse[]>(`${this.baseUrl}`, {params});
  }

  get(id: number): Observable<ApplicationResponse> {
    return this.http.get<ApplicationResponse>(`${this.baseUrl}/${id}`);
  }

  getApplicationById(applicationId: number): Observable<ApplicationResponse> {
    return this.http.get<ApplicationResponse>(`${this.baseUrl}/${applicationId}`);
  }

  approveApplication(id: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${id}/approve`, {});
  }

  declineApplication(id: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${id}/decline`, {});
  }
}
