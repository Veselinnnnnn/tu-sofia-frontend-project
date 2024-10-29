export interface EmailMessageResponse {
  messageId: number;
  sender: string;
  receiver: string;
  message: string;
  sentAt: string; // Use string type for date to handle conversion properly
}
