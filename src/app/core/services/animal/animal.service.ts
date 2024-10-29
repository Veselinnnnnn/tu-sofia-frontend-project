import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AnimalResponseModel } from '../../model/animal/AnimalResponse.model';
import { PageableResponseModel } from '../../model/PageableResponse.model';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  constructor(
    private http: HttpClient
  ) {
  }

  public getFeaturePets(): Observable<AnimalResponseModel[]> {
    return this.http.get<AnimalResponseModel[]>('/api/animal/random');
  }

  public getAllAvailable(page: number, size: number): Observable<PageableResponseModel<AnimalResponseModel>> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size);

    return this.http.get<PageableResponseModel<AnimalResponseModel>>('/api/animal/available', {params});
  }

  public getAllAnimals(): Observable<AnimalResponseModel[]> {
    return this.http.get<AnimalResponseModel[]>('/api/animal/all');
  }

  public getAllAnimalsPaginated(page: number, size: number): Observable<PageableResponseModel<AnimalResponseModel>> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size);

    return this.http.get<PageableResponseModel<AnimalResponseModel>>('/api/animal/all/paginated', {params});
  }

  public getAnimal(animalId: number, userId: number): Observable<AnimalResponseModel> {
    const params = new HttpParams()
      .set('animalId', animalId)
      .set('userId', userId);

    return this.http.get<AnimalResponseModel>('/api/animal', {params});
  }

  public createAnimal(formData: FormData): Observable<void> {
    return this.http.post<void>('api/animal', formData);
  }

  public updateAnimal(animalData: FormData): Observable<any> {
    return this.http.put(`api/animal`, animalData);
  }

  public deleteAnimal(id: number): Observable<any> {
    const params = new HttpParams()
      .set("id", id);

    return this.http.delete(`api/animal`, { params });
  }
}
