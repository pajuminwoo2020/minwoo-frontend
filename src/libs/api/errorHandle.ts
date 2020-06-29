import {message} from 'antd';
import {AxiosError, AxiosResponse} from 'axios';
import {get, map, set} from 'lodash';
import {FormInstance} from 'rc-field-form';
import {EerrorCode} from 'enums/errorCode.enum';
import {TError, TFieldError} from 'modules/error';

function handleHTTP400BadRequestError(error: AxiosError, data: TError) {
  switch (data?.error_code) {
    case EerrorCode.VALIDATION_ERROR:
      if (data.invalid_fields?.length > 0) {
        set(error, 'field_errors', data.invalid_fields);
      } else if (data?.error_message) {
        message.error(data?.error_message);
      } else {
        message.error('Invalid_fields');
      }
      break;
    case EerrorCode.PARSE_ERROR:
    default:
      message.error(data?.error_message ? data.error_message : '404 Not Found');
      break;
  }
  return Promise.reject(error);
}

function handleHTTP401UnauthorizedError(error: AxiosError, data: any) {
  switch (data?.error_code) {
    case EerrorCode.AUTHENTICATION_FAILED:
      message.error(data?.error_message);
      break;
    case EerrorCode.NOT_AUTHENTICATED:
      break;
    default:
      message.error('Authentication Error');
      break;
  }

  return Promise.reject(error);
}

function handleHTTP403ForbiddenError(error: AxiosError, data: any) {
  message.error(data?.error_message ? data.error_message : '403 Forbidden Error');

  return Promise.reject(error);
}

function handleHTTP404NotFoundError(error: AxiosError, data: any) {
  message.error(data?.error_message ? data.error_message : '404 Not Found Error');

  return Promise.reject(error);
}

function handleHTTP405MethodNotAllowedError(error: AxiosError, data: any) {
  message.error(data?.error_message ? data.error_message : '405 Method Not Allowed Error');

  return Promise.reject(error);
}

function handleHTTP406NotAcceptableError(error: AxiosError, data: any) {
  message.error(data?.error_message ? data.error_message : '406 Not Acceptable Error');

  return Promise.reject(error);
}

function handleHTTP415UnsupportedMediaTypeError(error: AxiosError, data: any) {
  message.error(data?.error_message ? data.error_message : '415 Unsupported Media Type Error');

  return Promise.reject(error);
}

function handleHTTP429TooManyRequestError(error: AxiosError, data: any) {
  message.error(data?.error_message ? data.error_message : '429 Too Many Request Error');

  return Promise.reject(error);
}

function handleHTTP500InternalServerError(error: AxiosError, data: any) {
  message.error('Internal server error');

  return Promise.reject(error);
}

export function handleHTTPError(error: AxiosError) {
  if (!error?.response) {
    // canceled는 뜨지 안도록
    if (!(get(error, 'message') === 'canceled')) {
      message.error(get(error, 'message', 'No response'));
    }

    return Promise.reject(error);
  }

  const {data, status} = error.response as AxiosResponse;

  switch (status) {
    case 400:
      return handleHTTP400BadRequestError(error, data);
    case 401:
      return handleHTTP401UnauthorizedError(error, data);
    case 403:
      return handleHTTP403ForbiddenError(error, data);
    case 404:
      return handleHTTP404NotFoundError(error, data);
    case 405:
      return handleHTTP405MethodNotAllowedError(error, data);
    case 406:
      return handleHTTP406NotAcceptableError(error, data);
    case 415:
      return handleHTTP415UnsupportedMediaTypeError(error, data);
    case 429:
      return handleHTTP429TooManyRequestError(error, data);
    case 500:
      return handleHTTP500InternalServerError(error, data);
    default:
      return Promise.reject(error);
  }
}

/* form의 name과 실제 server와 주고받는 api의 field_name이 다른경우 match에 {api의 field_name: form의 field_name} 형태로 추가해줘야한다. */
export function handleFieldError(error: Error, form: FormInstance, match?: object) {
  const fieldErrors = get(error, 'field_errors');
  if (fieldErrors) {
    const listFieldErrors: TFieldError[] = [];

    form.setFields(
      fieldErrors.map((field_error: TFieldError) => {
        let field_error_name = field_error.name;
        if (match && field_error.name in match) {
          field_error_name = get(match, field_error.name);
          if (!field_error_name) {
            message.error(field_error.message);

            return {name: '', errors: ['']};
          }
        }
        if (field_error.name instanceof Array) {
          listFieldErrors.push(field_error);
        }

        return {
          name: field_error_name,
          errors: [field_error.message],
        };
      }),
    );
    // Form.List의 경우 form.setFields로 error setting하는게 동작하지 않아 javascript로 직접 구헌함
    if (listFieldErrors?.length > 0) {
      map(listFieldErrors, (fieldError: TFieldError) => {
        const fieldId = get(match, '_list');
        const fieldElem = document.getElementById(fieldId(fieldError.name[0], fieldError.name[1]));
        const errNode = document.createElement('div');
        const errTextNode = document.createElement('div');
        errTextNode.innerText = fieldError.message;
        errNode.className = 'ant-form-item-explain';
        errNode.appendChild(errTextNode);
        fieldElem?.parentNode?.parentNode?.appendChild(errNode);
        // input에 값 입력시 빨간색 border효과 없애기
        fieldElem?.addEventListener('input', function(this: HTMLElement, e: any) {
          ((this as HTMLElement)?.parentNode as HTMLElement)?.nextElementSibling?.remove();
        });
        // input field에 빨간색 border효과주기
        (fieldElem?.parentNode?.parentNode?.parentNode as HTMLElement)?.classList.add('ant-form-item-has-error');
        (fieldElem?.parentNode?.parentNode?.parentNode as HTMLElement)?.classList.add('ant-form-item-with-help');
      });
    }
  }
}
