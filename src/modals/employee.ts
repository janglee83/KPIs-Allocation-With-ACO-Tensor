import type { Certificate, Major } from './qualification';
import type { Unit } from './unit';

export class Employee {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public certificates: Certificate[],
    public major: Major,
    public score: number,
    public unit: Unit,
  ) {}
}
