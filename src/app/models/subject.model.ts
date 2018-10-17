export class Subject {
  constructor(
    public id: number,
    public title: String,
    public color: String,
    public userIds: number[],
    public classIds: number[]
  ) { }
}
