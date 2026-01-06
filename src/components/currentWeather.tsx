import type {Forecast} from "../types/forecast.ts";

export default function CurrentWeather({data}: {data: Forecast}) {
    return (
        <>
            <h4>
               Temperature: {data.current.temperature_2m}&deg;
            </h4>
            <h4>
               Apparent Temperature: {data.current.apparent_temperature}&deg;
            </h4>
            <h4>
                Precipitation: {data.current.precipitation}%
            </h4>
            <h4>
                Humidity: {data.current.relative_humidity_2m}%
            </h4>
            <h4>
                Rain: {data.current.rain}%
            </h4>
        </>
    )
}