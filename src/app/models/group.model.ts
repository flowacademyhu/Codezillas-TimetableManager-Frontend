export class Group {
  constructor(
    public id: number,
    public name: String,
    public userIds: number[],
    public classIds: number[]
  ) { }
}
