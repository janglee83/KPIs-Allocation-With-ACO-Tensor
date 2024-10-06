import type { Measure } from './measure';
import type { TaskType } from './taskType';
import type { Unit } from './unit';

export class Task {
  constructor(
    public id: number,
    public taskType: TaskType,
    public description: string,
    public preTasks: Array<Task>,
    public measure: Measure,
    public unit: Unit,
    public startDate?: string,
    public endDate?: string,
  ) {}
}
