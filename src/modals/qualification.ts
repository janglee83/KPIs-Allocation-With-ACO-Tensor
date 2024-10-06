import type { MAJOR_TYPE } from '../types/qualification';
import type { Unit } from './unit';

class Qualification {
  constructor(
    public id: number,
    public name: string,
    public abbreviation: string,
    public score: number,
    public unit?: Unit,
    public type?: MAJOR_TYPE,
  ) {}
}

export class Certificate extends Qualification {
  constructor(id: number, name: string, abbreviation: string, score: number, unit?: Unit) {
    super(id, name, abbreviation, score, unit);
  }
}

export class Major extends Qualification {
  constructor(
    id: number,
    name: string,
    abbreviation: string,
    score: number,
    unit?: Unit,
    type?: MAJOR_TYPE,
  ) {
    super(id, name, abbreviation, score, unit, type);
  }
}
