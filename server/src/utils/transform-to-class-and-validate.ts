import { ClassConstructor } from 'class-transformer/types/interfaces';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';

import { BadRequestError } from '../errors/bad-request-error';

export const transformToClassAndValidate = async <T extends object, V = object>(
  clsConstructor: ClassConstructor<T>,
  plainObj: V
): Promise<T> => {
  try {
    const cls: T = plainToClass(clsConstructor, plainObj);
    await validateOrReject(cls, { forbidUnknownValues: true });
    return cls;
  } catch (errors) {
    throw new BadRequestError(undefined, errors);
  }
};
