export interface AuthI {
  access_token: string;
  expires_in: number;
  roles: Array<string>;
  token_type: string;
  username: string;
}
