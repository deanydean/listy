import { NextFunction, Request, Response } from 'express';

export interface IError {
  message?: string;
  status?: number;
  code?: number;
  statusCode?: number;
}

export const errorHandler = (
  err: IError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  handleError(err, res);
};

export const handleError = (err: IError, res: Response): void => {
  const message = err.message ?? 'ERROR!';
  res.status(500).send(message);
  console.error(err);
};
