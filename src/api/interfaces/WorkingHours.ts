import { Response } from "./Response";

export interface WorkingHours {
    saturday: string;
    sunday: string;
    monday: string;
    tuseday?: string;
    wednesday: string;
    thursday: string;
    friday: string;
    tuesday?:string

}

export type WorkingHoursResponse = Response<WorkingHours>;
