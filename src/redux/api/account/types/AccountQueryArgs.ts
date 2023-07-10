export interface AccountQueryArgsDefault {
  session_id: string;
  account_id?: number;
}

export interface AccountQueryArgsWithParams extends AccountQueryArgsDefault {
  params?: string;
  type: "movies" | "tv";
}