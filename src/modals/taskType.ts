import type { Dayjs } from 'dayjs';
import type { Employee } from './employee';
import type { Unit } from './unit';

export class TaskType {
  constructor(
    public id: number,
    public name: string,
    public listEmployees: Array<Employee>,
    public unit: Unit,
    public value: string,
    public item: string,
    public startDate: Dayjs,
    public endDate: Dayjs,
  ) {}
}
