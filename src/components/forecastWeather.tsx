import type {Forecast} from "../types/forecast.ts";
import {LocaleNumber} from "../functions/localeNumber.ts";
import {DateTime} from "luxon";

export default function ForecastWeather({data}: { data: Forecast }) {
    return (
        <div className="overflow-hidden">
            <div className="h-[70vh] overflow-auto">
                <table className="min-w-full rounded-lg" role={"table"}>
                    <thead className="text-xl text-green-200 sticky top-0 z-10 divide-y">
                    <tr className="bg-neutral-500 rounded-lg outline-2 outline-b-4 outline-green-200">
                        <td className={"py-4 rounded-lg"}>
                            Hour
                        </td>
                        <td>
                            Temperature
                        </td>
                        <td>
                            Humidity
                        </td>
                        <td>
                            Rain
                        </td>
                        <td>
                            Precipitation
                        </td>
                        <td>
                            Visibility
                        </td>
                        <td>
                            Dew Point
                        </td>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        data.hourly.time.map((v, i) => (
                            <tr className="even:bg-neutral-600 rounded-lgc" key={i}>
                                <td className={"py-2"}>
                                    {DateTime.fromISO(v).toLocaleString(DateTime.DATETIME_SHORT)}
                                </td>
                                <td>
                                    {data.hourly.temperature_2m[i]}&deg;
                                </td>
                                <td>
                                    {data.hourly.relative_humidity_2m[i]}%
                                </td>
                                <td>
                                    {data.hourly.rain[i]} in
                                </td>
                                <td>
                                    {data.hourly.precipitation_probability[i]}%
                                </td>
                                <td>
                                    {LocaleNumber(data.hourly.visibility[i])} ft
                                </td>
                                <td>
                                    {data.hourly.dew_point_2m[i]}&deg;
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>

        </div>
    )
}