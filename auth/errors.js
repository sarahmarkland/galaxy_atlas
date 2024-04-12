// export const InvalidUserPassError = new Error(
//   "request must contain fields 'username' and 'password'"
// );

export class InvalidParamsError extends Error {
  constructor(message, options) {
    super(message, options);
  }
}
