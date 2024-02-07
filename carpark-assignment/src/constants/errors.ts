import { HttpStatus } from '@nestjs/common';

export enum ErrorCodes {
  INTERNAL_SERVER_ERROR = HttpStatus.INTERNAL_SERVER_ERROR,
  UNAUTHORIZED = HttpStatus.UNAUTHORIZED,
}

enum GroupErrorCodes {
  GENERAL = '00',
  AUTH = '01',
  USER = '02',
}

const getUserErrorCode = (code: string) => `${GroupErrorCodes.USER}${code}`;

export const Errors = {
  INTERNAL_SERVER_ERROR: {
    message: 'Internal server error occurred',
  },
  FORBIDDEN: {
    message: 'You has not permission',
  },
  UNAUTHORIZED: {
    message: 'Unauthorized',
  },
  USER_NOT_FOUND: {
    message: 'User not found',
    code: getUserErrorCode('001'),
  },
  USER_EMAIL_EXISTED: {
    message: 'User is existed',
    code: getUserErrorCode('005'),
  },
  USER_PASSWORD_IS_INCORRECT: {
    message: 'Password is incorrect',
    code: getUserErrorCode('002'),
  },
  USER_USERNAME_OR_PASSWORD_IS_INCORRECT: {
    message: 'Username or password is incorrect',
    code: getUserErrorCode('002'),
  },
  VALUE_MUST_BE_A_NUMBER: {
    message: 'Value must be a number',
  },
  CARPARK_EXISTED: {
    message: 'The carpark already in favorite list!',
  },
  CARKPARK_NOT_FOUND: {
    message: 'The carpark is not found!',
  },
  NO_FAVORITE_FOR_USER: {
    message: "This user doesn't have any favorite carpark yet!",
  },
};
