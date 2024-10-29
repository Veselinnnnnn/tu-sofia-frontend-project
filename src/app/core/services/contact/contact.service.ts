import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CommentResponseModel } from '../../model/comment/CommentResponse.model';
import { CommentAddRequestModel } from '../../model/comment/CommentAddRequest.model';
import { ContactRequest } from '../../model/contact/ContactRequest';
import { ContactResponse } from '../../model/contact/ContactResponse';
import { ReplyRequest } from '../../model/contact/ReplyRequest';
import { EmailThreadResponse } from '../../model/contact/EmailThreadResponse';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = '/api/contact';

  constructor(
    private http: HttpClient
  ) {
  }
  sendEmail(request: ContactRequest): Observable<void> {
    return this.http.post<void>(this.apiUrl, request);
  }

  sendReply(request: ReplyRequest): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/reply`, request);
  }

  getContact(id: number): Observable<ContactResponse> {
    return this.http.get<ContactResponse>(`${this.apiUrl}/${id}`);
  }

  getEmailThread(threadId: number): Observable<EmailThreadResponse> {
    return this.http.get<EmailThreadResponse>(`${this.apiUrl}/threads/${threadId}`);
  }
}
