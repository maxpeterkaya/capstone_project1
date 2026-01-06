import {useEffect, useState} from 'react'
import type {Forecast} from "./types/forecast.ts";
import LoadingComponent from "./components/loading.tsx";
import CurrentWeather from "./components/currentWeather.tsx";
import ForecastWeather from "./components/forecastWeather.tsx";
import Error from "./components/error.tsx";

export default function App() {
    const [data, setData] = useState<Forecast>({} as Forecast);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState<"current" | "forecast">("current");

    useEffect(() => {
        const url = new URL("https://api.open-meteo.com/v1/forecast");

        const params = {
            latitude: 34.7304,
            longitude: -86.5859,
            hourly: "temperature_2m,relative_humidity_2m,rain,precipitation_probability,weather_code,visibility,dew_point_2m",
            current: "temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,rain,showers,weather_code",
            wind_speed_unit: "mph",
            temperature_unit: "fahrenheit",
            precipitation_unit: "inch",
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

        fetch(url.toString()).then(res => {
            if (!res.ok) return setError(`Couldn't fetch weather data! Server returned ${res.status}.`);
            return res.json()
        }).then((data) => {
            setLoading(false);
            setData(data);
        })
    }, [])

    if (loading && error.length == 0) return <LoadingComponent/>

    if (error.length > 0) return <Error error={error}/>

    return (
        <div className="flex flex-col justify-center items-center gap-4">
            <h1 className={"text-3xl"}>
                Huntsville, Alabama
            </h1>
            <h2 className={"text-2xl"}>
                Latitude: {data.latitude} | Longitude: {data.longitude}
            </h2>
            <br/>
            <div className={"flex flex-row gap-2 justify-center"}>
                <button
                    className={`border-2 border-green-200 ${view == "current" ? "bg-green-300" : ""} rounded-xl p-2 hover:bg-green-600`}
                    onClick={() => setView("current")}
                >
                    Current
                </button>
                <button
                    className={`border-2 border-green-200 ${view == "forecast" ? "bg-green-300" : ""} rounded-xl p-2 hover:bg-green-600`}
                    onClick={() => setView("forecast")}
                >
                    Forecast
                </button>
            </div>
            <div
                className={"bg-gray-700 rounded-xl p-4 w-[90vw]"}
            >
                {
                    view == "current" && <CurrentWeather data={data}/>
                }
                {
                    view == "forecast" && <ForecastWeather data={data}/>
                }
            </div>

        </div>
    )
}
