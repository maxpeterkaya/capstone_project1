import {useEffect, useState} from 'react'
import type {Forecast} from "./types/forecast.ts";
import LoadingComponent from "./components/loading.tsx";
import CurrentWeather from "./components/currentWeather.tsx";
import ForecastWeather from "./components/forecastWeather.tsx";
import Error from "./components/error.tsx";
import {DateTime} from "luxon";

export default function App() {
    const [data, setData] = useState<Forecast>({} as Forecast);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState<"current" | "forecast">("current");
    const [latitude, setLatitude] = useState(34.7304);
    const [longitude, setLongitude] = useState(-86.5859);
    const [location, setLocation] = useState<{ city: string, state: string }>({city: "Huntsville", state: "Alabama"});
    const [outdated, setOutdated] = useState(false);

    useEffect(() => {
        fetchData().then()
    }, []);

    const fetchCity = async () => {
        setLoading(true);

        const url = new URL("https://geocoding-api.open-meteo.com/v1/search");

        const params = {
            name: location.city,
            count: 2,
            language: "en",
            format: "json",
            countryCode: "US"
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

        const res = await fetch(url.toString());

        if (!res.ok) {
            setError(`Couldn't fetch weather data! Server returned ${res.status}.`);
            return;
        }

        const data = await res.json();

        if (!data) {
            setError(`Couldn't understand data! Server returned ${res.status}.`);
            return;
        }

        if (data.results.length == 0) {
            setError(`City not found!`);
            return;
        }

        setLocation({state: data.results[0].admin1, city: data.results[0].name});
        setLatitude(data.results[0].latitude);
        setLongitude(data.results[0].longitude);

        await fetchData();

        return;
    }

    const fetchData = async () => {
        setLoading(true);

        const url = new URL("https://api.open-meteo.com/v1/forecast");

        const params = {
            latitude: latitude,
            longitude: longitude,
            hourly: "temperature_2m,relative_humidity_2m,rain,precipitation_probability,weather_code,visibility,dew_point_2m",
            current: "temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,rain,showers,weather_code",
            wind_speed_unit: "mph",
            temperature_unit: "fahrenheit",
            precipitation_unit: "inch",
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

        const res = await fetch(url.toString());

        if (!res.ok) {
            setError(`Couldn't fetch weather data! Server returned ${res.status}.`);
            return;
        }

        const data = await res.json();

        setLoading(false);
        setOutdated(false);
        setData(data);

        return;
    }

    return (
        <div className="flex flex-col justify-center items-center gap-4">
            <div>
                <h1 className={"text-3xl"}>
                    Enter a US City below to get the latest weather forecast:
                </h1>
                <br/>
                <input
                    id={"city"}
                    className={"bg-neutral-600 rounded-lg outline-0 border-2 border-green-300 text-center text-2xl hover:border-green-600 focus:border-green-600"}
                    value={location.city}
                    onChange={(e) => {
                        setLocation({...location, city: e.target.value})
                        setOutdated(true);
                    }}
                    onKeyDown={(e) => e.key == "Enter" && fetchCity().then()}
                />

                <h2 className={`text-xl ${outdated ? "opacity-60" : ""}`}>
                    {location.state}
                </h2>
            </div>
            <h4 className={`${outdated ? "" : "text-transparent"}`}>
                Click the button below or press the 'Enter' key to fetch the latest results!
            </h4>
            <button
                onClick={fetchCity}
                className={`border-2 border-transparent ${outdated ? "opacity-100 bg-green-300" : "opacity-80"} hover:bg-green-300 p-2 rounded-2xl text-white hover:text-black`}
            >
                Search
            </button>
            <Error error={error}>
                <h3 className={`text-xl ${outdated ? "opacity-60" : ""}`}>
                    Latitude: {latitude} |
                    Longitude: {longitude}
                </h3>
                <br/>
                <div
                    className={`flex flex-row gap-2 justify-center ${outdated ? "opacity-60 pointer-events-none" : ""}`}>
                    <button
                        className={`cursor-pointer border-2 border-green-200 ${view == "current" ? "bg-green-300" : ""} rounded-xl p-2 hover:bg-green-600`}
                        onClick={() => setView("current")}
                    >
                        Current
                    </button>
                    <button
                        className={`cursor-pointer border-2 border-green-200 ${view == "forecast" ? "bg-green-300" : ""} rounded-xl p-2 hover:bg-green-600`}
                        onClick={() => setView("forecast")}
                    >
                        Forecast
                    </button>
                </div>
                <br/>
                <div
                    className={`bg-neutral-800 rounded-xl p-4 w-[90vw] min-h-[40vh] ${outdated ? "opacity-60" : ""}`}
                >
                    {
                        loading ?
                            <LoadingComponent/> :
                            <div className={"flex flex-col justify-center items-center"}>
                                <h3>
                                    Current weather time: {DateTime.fromISO(data.current.time, {zone: "utc"}).toLocal().toLocaleString(DateTime.DATETIME_MED)}
                                </h3>
                                {
                                    view == "current" && <CurrentWeather data={data}/>
                                }
                                {
                                    view == "forecast" && <ForecastWeather data={data}/>
                                }
                            </div>
                    }
                </div>
            </Error>
        </div>
    )
}
