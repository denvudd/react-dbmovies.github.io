// A list of errors you might come across while using TMDB
// link: https://developer.themoviedb.org/docs/errors

// Most common error codes
type ApiErrorStatusCode =
  | 2 // Invalid service: this service does not exist.
  | 3 // Authentication failed: You do not have permissions to access the service.
  | 4 // Invalid format: This service doesn't exist in that format.
  | 5 // Invalid parameters: Your request parameters are incorrect.
  | 6 // Invalid id: The pre-requisite id is invalid or not found.
  | 7 // Invalid API key: You must be granted a valid key.
  | 9 // Service offline: This service is temporarily offline, try again later.
  | 11 // Internal error: Something went wrong, contact TMDB.
  | 14 // Authentication failed.
  | 17 // Session denied.
  | 24 // Your request to the backend server timed out. Try again.
  | 34 // The resource you requested could not be found.
  | 35 // Invalid token.
  | 39; // This resource is private.

export interface ApiError {
  success: boolean;
  status_code: ApiErrorStatusCode;
  status_message: string;
}
