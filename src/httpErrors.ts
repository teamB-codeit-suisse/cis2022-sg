export class HttpError extends Error {
  status: number
  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}

export class NotFound extends HttpError {
  constructor(message?: string) {
    super(404, message || 'Resource not found')
    Object.setPrototypeOf(this, new.target.prototype) // restore prototype chain
    Error.captureStackTrace(this)
  }
}

export class ResourceConflict extends HttpError {
  constructor(message?: string) {
    super(409, message || 'Resource has been used')
    Object.setPrototypeOf(this, new.target.prototype) // restore prototype chain
    Error.captureStackTrace(this)
  }
}

export class BadRequest extends HttpError {
  constructor(message?: string) {
    super(400, message || 'Bad Request')
    Object.setPrototypeOf(this, new.target.prototype) // restore prototype chain
    Error.captureStackTrace(this)
  }
}

export class Unauthorized extends HttpError {
  constructor(message?: string) {
    super(401, message || 'Unauthorized to perform this action')
    Object.setPrototypeOf(this, new.target.prototype) // restore prototype chain
    Error.captureStackTrace(this)
  }
}

export class Forbidden extends HttpError {
  constructor(message?: string) {
    super(403, message || 'Forbidden to perform this action')
    Object.setPrototypeOf(this, new.target.prototype) // restore prototype chain
    Error.captureStackTrace(this)
  }
}
