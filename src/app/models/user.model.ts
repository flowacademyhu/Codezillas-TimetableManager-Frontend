export class User {
  constructor(
    public id: number,
    public name: String,
    public nickname: String,
    public email: String,
    public password: String,
    public confirmPassword: String,
  ) { }
}
