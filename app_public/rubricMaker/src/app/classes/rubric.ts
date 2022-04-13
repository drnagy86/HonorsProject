export class Criteria {
  constructor(_id: string, content: string, score: number, dateCreated: Date, dateUpdate: Date, active: boolean) {
    this._id = _id;
    this.content = content;
    this.score = score;
    this.dateCreated = dateCreated;
    this.dateUpdate = dateUpdate;
    this.active = active;
  }

  _id : string;
  content: string;
  score: number;
  dateCreated: Date;
  dateUpdate: Date;
  active: boolean;
}


export class Facets {
  constructor(
    _id: string,
    description: string,
    dateCreated: Date,
    dateUpdate: Date,
    active: boolean,
    criteria: Criteria[]) {

    this._id = _id;
    this.description = description;
    this.dateCreated = dateCreated;
    this.dateUpdate = dateUpdate;
    this.active = active;
    this.criteria = criteria;
  }
  _id : string;
  description: string;
  dateCreated: Date;
  dateUpdate: Date;
  active: boolean;
  criteria: Criteria[];
}

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
  constructor(id: string, name: string, description: string, dateCreated: Date, dateUpdated: Date, rubricCreator: string, active: boolean, subjects: Subject[], facets: Facets[]) {
    this._id = id;
    this.name = name;
    this.description = description;
    this.dateCreated = dateCreated;
    this.dateUpdated = dateUpdated;
    this.rubricCreator = rubricCreator;
    this.active = active;
    this.subjects = subjects;
    this.facets = facets;
  }
  _id: string;
  name: string;
  description: string;
  dateCreated : Date;
  dateUpdated : Date;
  rubricCreator: string;
  active: boolean;
  subjects: Subject[];
  facets: Facets[];
}
