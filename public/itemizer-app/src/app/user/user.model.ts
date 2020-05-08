export class User {
  constructor(
    public name: String,
    public email: String,
    private _token: String
  ) {}

  get token() {
    if (this._token) {
      return this._token;
    } else {
      return null;
    }
  }
}
