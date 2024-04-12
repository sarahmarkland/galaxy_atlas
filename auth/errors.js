// export const InvalidUserPassError = new Error(
//   "request must contain fields 'username' and 'password'"
// );

export class InvalidJSONError extends Error {
  constructor(message, options) {
    super(message, options);
  }
}
