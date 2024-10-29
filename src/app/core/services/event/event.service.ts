import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EventResponseModel } from '../../model/event/EventResponse.model';
import { EventRequest } from '../../model/event/EventRequest.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = '/api/events';

  constructor(
    private http: HttpClient
  ) {
  }

  getCurrentEvents(): Observable<EventResponseModel[]> {
    return this.http.get<EventResponseModel[]>('/api/events/current');
  }

  getPastEvents(): Observable<EventResponseModel[]> {
    return this.http.get<EventResponseModel[]>('/api/events/past');
  }

  createEvent(event: EventRequest): Observable<EventResponseModel> {
    return this.http.post<EventResponseModel>(this.apiUrl, event);
  }

  updateEvent(id: number, event: EventRequest): Observable<EventResponseModel> {
    return this.http.put<EventResponseModel>(`${this.apiUrl}/${id}`, event);
  }

  deleteEvent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
