import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApplicationDetailsResponseModel } from '../../model/application-details/ApplicationDetailsResponse.model';

@Injectable({
  providedIn: 'root'
})
export class ApplicationDetailsService {
  private baseUrl = '/api/application-details';

  constructor(
    private http: HttpClient
  ) {
  }

  getApplicationDetailsByApplicationId(applicationId: number): Observable<ApplicationDetailsResponseModel> {
    const params = new HttpParams()
      .set('applicationId', applicationId);

    return this.http.get<ApplicationDetailsResponseModel>(this.baseUrl, {params});
  }
}
