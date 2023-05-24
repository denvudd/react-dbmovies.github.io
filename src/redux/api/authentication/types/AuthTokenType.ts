export interface AuthTokenApiResponse {
  success: boolean;
  expires_at: string;
  request_token: string;
}