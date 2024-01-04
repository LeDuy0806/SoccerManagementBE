export interface ICustomError {
  statusCode: number;
  message: string;
}

export class CustomError implements ICustomError {
  statusCode: number;
  message: string;
  constructor(statusCode: number, message: string) {
    this.message = message;
    this.statusCode = statusCode;
  }
}
