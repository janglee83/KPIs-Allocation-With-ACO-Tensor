import type { Unit } from './unit';

export class Measure {
  constructor(
    public id: number,
    public description: string,
    public planedValue: number,
    public unit: Array<Unit>,
    public successCriteria: string,
  ) {}
}
