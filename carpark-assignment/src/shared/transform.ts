import { BadRequestException } from '@nestjs/common';
import { TransformFnParams } from 'class-transformer';
import { Errors } from 'src/constants/errors';

export const toTrimString = ({ value }: TransformFnParams): string => {
  return value ? value.trim() : value;
};

export interface IToNumberOptions {
  default?: number;
  min?: number;
  max?: number;
}

export const toNumber = (
  key: string,
  value: string,
  opts: IToNumberOptions = {},
): number => {
  const newValue: number = Number.parseFloat(value || String(opts.default));

  if (Number.isNaN(newValue)) {
    throw new BadRequestException(Errors.VALUE_MUST_BE_A_NUMBER);
  }

  return newValue;
};
