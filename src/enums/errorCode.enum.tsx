export enum EerrorCode {
  VALIDATION_ERROR = -400001, // 유효성 검사 실패
  PARSE_ERROR = -400002, // Malformed request
  UNHANDLED_EXCEPTION = -400003, // Unhandled exception
  AUTHENTICATION_FAILED = -401001, // Incorrect authentication credentials
  NOT_AUTHENTICATED = -401002, // Authentication credentials were not provieded
  PERMISSION_DENIED = -403005, // Do not have permission to perform the action
  NOT_FOUND = -404006, // Not Found
  METHOD_NOT_ALLOWED = -405007, // Method not allowed
  NOT_ACCEPTABLE = -406008, // Could not satisfy the request Accept header
  UNSUPPORTED_MEDIA_TYPE = -415009, // Unsupported media type in request
  TOO_MANY_REQUESTS = -429010, // Request was throttled
}
