export interface IMaintenance {
    id?: number;
    description?: string;
    status?: boolean;
    createdAt?: Date;
}

export class Maintenance implements IMaintenance {
    constructor(public id?: number, public description?: string, public status?: boolean, public createdAt?: Date) {}
}

export function getMaintenanceIdentifier(maintenance: IMaintenance): number | undefined {
    return maintenance.id;
}
