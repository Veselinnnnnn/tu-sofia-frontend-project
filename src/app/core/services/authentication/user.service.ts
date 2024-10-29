import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {LocalStorageService} from "../utils/local-storage.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {TokenResponseModel} from "../../model/user/TokenResponse.model";
import { request } from 'node:http';
import { UserResponseModel } from '../../model/user/UserResponse.model';
import { UserBasicInfoRequestModel } from '../../model/user/UserBasicInfoRequest.model';
import { UserAdvancedInfoResponseModel } from '../../model/user/UserAdvancedInfoResponse.model';
import { UserAdvancedInfoRequestModel } from '../../model/user/UserAdvancedInfoRequest.model';

@Injectable({
  providedIn: "root"
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  public register(request: any): Observable<TokenResponseModel> {
    return this.http.post<TokenResponseModel>('/api/auth/register', request);
  }

  public login (request: any):Observable<TokenResponseModel> {
    return this.http.post<TokenResponseModel>('/api/auth/authenticate',request);
  }

  public getTeamMembers(): Observable<UserResponseModel[]> {
    return this.http.get<UserResponseModel[]>('/api/users/members');
  }

  public getProfileImage(id: number): Observable<any> {
    const params = new HttpParams()
      .set("id", id);

    return this.http.get('/api/users/user-image', {params, responseType: 'blob'});
  }

  public getFirstAndLastName(id: number): Observable<UserResponseModel> {
    const params = new HttpParams()
      .set("id", id);

    return this.http.get<UserResponseModel>('/api/users/first-last-name', {params});
  }

  public updateProfileImage(id: number, image: File): Observable<void> {
    const formData: FormData = new FormData();
    formData.append('id', id.toString());
    formData.append('image', image);

    return this.http.put<void>('/api/users/user-image', formData, {
      headers: new HttpHeaders({
        'enctype': 'multipart/form-data'
      })
    });
  }

  public getBasicInfo(id: number): Observable<UserResponseModel> {
    const params = new HttpParams()
      .set("id", id);

    return this.http.get<UserResponseModel>('/api/users/basic-info', {params});
  }

  public updateBasicInfo(request: UserBasicInfoRequestModel): Observable<void> {
    return this.http.put<void>('/api/users/basic-info', request);
  }

  public getAdvancedInfo(id: number): Observable<UserAdvancedInfoResponseModel> {
    const params = new HttpParams()
      .set("id", id);

    return this.http.get<UserAdvancedInfoResponseModel>('/api/users/advanced-info', {params});
  }

  public updateAdvancedInfo(request: UserAdvancedInfoRequestModel): Observable<void> {
    return this.http.put<void>('/api/users/advanced-info', request);
  }

  public getRandomUsers(): Observable<UserResponseModel[]> {
    return this.http.get<UserResponseModel[]>('/api/users/random');
  }
}
