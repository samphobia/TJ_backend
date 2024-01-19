class CustomError extends Error {
  status: number;
  statusCode: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }

  toJSON(): Record<string, unknown> {
    return {
      success: false,
      status: this.status,
      message: this.message,
    };
  }
}

export { CustomError };
