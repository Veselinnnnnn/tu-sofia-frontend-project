import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CommentResponseModel } from '../../model/comment/CommentResponse.model';
import { CommentAddRequestModel } from '../../model/comment/CommentAddRequest.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(
    private http: HttpClient
  ) {
  }

  addComment(animalId: number, userId: number, request: CommentAddRequestModel): Observable<CommentResponseModel> {
    const params = new HttpParams()
      .set('animalId', animalId)
      .set('userId', userId);

    return this.http.post<CommentResponseModel>('/api/comment', request, {params});
  }

  updateComment(commentId: number, request: CommentAddRequestModel): Observable<CommentResponseModel> {
    const params = new HttpParams()
      .set('commentId', commentId);

    return this.http.put<CommentResponseModel>('/api/comment', request, {params});
  }

  deleteComment(commentId: number): Observable<void> {
    const params = new HttpParams()
      .set('commentId', commentId);

    return this.http.delete<void>('/api/comment', {params});
  }

  incrementLikes(commentId: number, userId: number): Observable<CommentResponseModel> {
    const params = new HttpParams()
      .set('commentId', commentId)
      .set('userId', userId);

    return this.http.put<CommentResponseModel>(`/api/comment/like`, null, {params});
  }

  incrementDislikes(commentId: number, userId: number): Observable<CommentResponseModel> {
    const params = new HttpParams()
      .set('commentId', commentId)
      .set('userId', userId);

    return this.http.put<CommentResponseModel>(`/api/comment/dislike`, null, {params});
  }
}
