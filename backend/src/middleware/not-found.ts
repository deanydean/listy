import { NextFunction, Request, Response } from 'express';

export const notFound = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  handleNotFound(res);
  next();
};

export const handleNotFound = (res: Response): void => {
  const message = 'Not Found!';
  res.status(404).send(message);
};
