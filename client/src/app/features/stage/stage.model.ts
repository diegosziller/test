import { IMaintenance } from "../maintenance/maintenance.model";
import { StageType } from "./enum/stage-type.model";

export interface IStage {
  id?: number;
  description?: string;
  status?: boolean;
  type?: StageType;
  value?: string | null;
  createdAt?: Date;
  maintenanceId?: number;
  maintenance?: IMaintenance
}

export class Stage implements IStage {
  constructor(
    public id?: number,
    public description?: string,
    public status?: boolean,
    public type?: StageType,
    public value?: string | null,
    public createdAt?: Date,
    public maintenanceId?: number,
    public maintenance?: IMaintenance
  ) {}
}
