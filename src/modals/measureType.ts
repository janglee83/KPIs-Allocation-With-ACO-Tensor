import type { Measure } from './measure';
import type { Unit } from './unit';

export class MeasureType {
  constructor(
    public id: number,
    public measure: Measure,
    public unit: Unit,
    public weight: number,
  ) {}
}
