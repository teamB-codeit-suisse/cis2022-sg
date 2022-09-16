import { NextFunction, Request, Response } from 'express'
import { HttpError } from './httpErrors'

export const asyncErrorWrapper = (
  routeHandler: (req: Request, res: Response, next: NextFunction) => any
) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    routeHandler(req, res, next).catch(next)
  }
}

// Returns a json reponse with the respective error
export function jsonErrorResponse(error: Error, res: Response): Response {
  // This error happens when someone types a malformed url such as /%c0
  if (error instanceof URIError) {
    return res.sendStatus(400)
  }
  // If error has code and json defined, display it
  if (error instanceof HttpError) {
    return res.status(error.status).json({ message: error.message })
  }
  // For all other errors send 500 with generic message
  return res.status(500).json({
    message: 'Internal Server Error',
  })
}
