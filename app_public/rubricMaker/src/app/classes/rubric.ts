
export class Subject {
  constructor(
    subject_id: string,
    description: string,
    dateCreated: Date = new Date(),
    dateUpdate: Date = new Date(),
    active: boolean = true)
  {
    this.subject_id = subject_id;
    this.description = description;
    this.dateCreated = dateCreated;
    this.dateUpdate = dateUpdate;
    this.active = active;
  }
  subject_id : string;
  description: string;
  dateCreated: Date;
  dateUpdate: Date;
  active: boolean;
}
export class Rubric {
  constructor(id: string, name: string, description: string, dateCreated: Date, dateUpdated: Date, rubricCreator: string, active: boolean, subjects: Subject[]) {
    this._id = id;
    this.name = name;
    this.description = description;
    this.dateCreated = dateCreated;
    this.dateUpdated = dateUpdated;
    this.rubricCreator = rubricCreator;
    this.active = active;
    this.subjects = subjects;
  }
  _id: string;
  name: string;
  description: string;
  dateCreated : Date;
  dateUpdated : Date;
  rubricCreator: string;
  active: boolean;
  subjects: Subject[]
}
