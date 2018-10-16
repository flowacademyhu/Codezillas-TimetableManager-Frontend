export class User {
  constructor(
    public id: number,
    public name: String,
    public nickname: String,
    public email: String,
    public password: String,
    public activationCode: String,
    public roles: String[],
    public classIds: number[],
    public subjectIds: number[],
    public groupId: number,
    public enabled: boolean
  ) { }
}
