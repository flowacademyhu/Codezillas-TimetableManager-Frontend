export class Class {
  constructor(
    public id: number,
    public comment: String,
    public endDate: Date,
    public startDate: Date,
    public groupId: number,
    public subjectId: number,
    public mentorIds: number[]
  ) { }
}
