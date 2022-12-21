import { NextFunction, Request, Response } from 'express'

import { LogModel } from '../models/log.model'

export const logger = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.info('Request received.')
  res.on('finish', () => {
    createLog(req, res)
  })

  next()
}

export const createLog = (req: Request, res: Response): void => {
  const log: LogModel = {
    timestamp: Date.now(),
    status: res.statusCode,
    method: req.method,
    endpoint: req.url,
    params: req.params
  }
  console.info(log)
}
