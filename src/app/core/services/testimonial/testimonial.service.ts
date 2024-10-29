import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { EventResponseModel } from '../../model/event/EventResponse.model';
import { EventRequest } from '../../model/event/EventRequest.model';
import { TestimonialResponseModel } from '../../model/testimonial/TestimonialResponse.model';
import { TestimonialRequestModel } from '../../model/testimonial/TestimonialRequest.model';

@Injectable({
  providedIn: 'root'
})
export class TestimonialService {
  private baseUrl = '/api/testimonials';

  constructor(
    private http: HttpClient
  ) {
  }

  public saveTestimonial(request: TestimonialRequestModel): Observable<TestimonialResponseModel> {
    return this.http.post<TestimonialResponseModel>(`${this.baseUrl}`, request);
  }

  public updateTestimonial(id: number, request: TestimonialRequestModel): Observable<TestimonialResponseModel> {
    const params = new HttpParams()
      .set('id', id);

    return this.http.put<TestimonialResponseModel>(`${this.baseUrl}`, request, {params});
  }

  getAllTestimonials(): Observable<TestimonialResponseModel[]> {
    return this.http.get<TestimonialResponseModel[]>(`${this.baseUrl}`);
  }

  deleteTestimonial(id: number): Observable<void> {
    const params =  new HttpParams()
      .set('id', id);

    return this.http.delete<void>(`${this.baseUrl}`, {params});
  }
}
