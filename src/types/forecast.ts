import type {CurrentUnits} from "./current_units.ts";
import type {Current} from "./current.ts";
import type {HourlyUnits} from "./hourly_units.ts";
import type {Hourly} from "./hourly.ts";

export interface Forecast {
    latitude: number;
    longitude: number;
    generationtime_ms: number;
    utc_offset_seconds: number;
    timezone: string;
    timezone_abbreviation: string;
    elevation: number;
    current_units: CurrentUnits;
    current: Current;
    hourly_units: HourlyUnits;
    hourly: Hourly;
}