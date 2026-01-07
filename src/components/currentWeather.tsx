import type {Forecast} from "../types/forecast.ts";

export default function CurrentWeather({data}: { data: Forecast }) {
    return (
        <div className={"w-[50vw] h-full flex flex-col gap-4"}>
            <div className={"flex flex-row justify-between items-center"}>
                <span>
                    Temperature:
                </span>
                <span>
                    {data.current.temperature_2m}&deg;
                </span>
            </div>
            <div className={"flex flex-row justify-between"}>
                <span>
                    Apparent Temperature:
                </span>
                <span>
                    {data.current.apparent_temperature}&deg;
                </span>
            </div>
            <div className={"flex flex-row justify-between"}>
                <span>
                    Precipitation:
                </span>
                <span>
                    {data.current.precipitation}%
                </span>
            </div>
            <div className={"flex flex-row justify-between"}>
                <span>
                    Humidity:
                </span>
                <span>
                    {data.current.relative_humidity_2m}%
                </span>
            </div>
            <div className={"flex flex-row justify-between"}>
                <span>
                    Rain:
                </span>
                <span>
                    {data.current.rain}%
                </span>
            </div>
        </div>
    )
}