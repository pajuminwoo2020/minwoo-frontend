/**
 * Error
 */

export type TFieldError = {
  name: string | string[] /* field name path */;
  message: string /* backend에서 번역된 error message */;
};

export type TError = {
  error_code: number;
  error_message: string;
  invalid_fields: TFieldError[];
};

export type TFieldErrorMessage = {
  name: string /* field name */;
  errors: string[];
};
