import { EmailMessageResponse } from './EmailMessageResponse';

export interface EmailThreadResponse {
  threadId: number;
  userEmail: string;
  adminEmail: string;
  subject: string;
  messages: EmailMessageResponse[];
}
