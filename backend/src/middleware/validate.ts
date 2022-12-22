import { NextFunction, Request, Response } from 'express';
import { ValidationChain, validationResult } from 'express-validator';

export function validate(validations: ValidationChain[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(
      validations.map(async (validation) => await validation.run(req))
    );

    const validationErrors = validationResult(req);

    if (validationErrors.isEmpty()) {
      console.info('Request valid.');
      return next();
    }

    console.info('Request invalid:\n', validationErrors);
    res.status(400).json({ errors: validationErrors.array() });
  };
}
