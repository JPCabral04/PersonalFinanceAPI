import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

export const validateRequest = async <T>(dto: new () => T, body: any) => {
  const instance = plainToInstance(dto, body);
  const errors = await validate(instance as object);
  if (errors.length > 0) {
    const messages = errors
      .map((err) => Object.values(err.constraints || {}))
      .flat();
    throw new Error(messages.join(', '));
  }
  return instance;
};
