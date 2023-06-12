export interface ListCreateApiResponse {
  status_message: string;
  success: boolean;
  status_code: number;
  list_id: number;
}

export interface ListCreateQueryArgs {
  session_id: string;
  name: string;
  description: string;
}