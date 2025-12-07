import React, {useEffect, useState} from "react";
import WeatherCard from "../components/WeatherCard";
import { getWeather } from "../api/weatherApi";

const WeatherPage: React.FC = () => {
    const [weather, setWeather] = useState<{date: string; temperature: number; summary:string} []>([]);


    useEffect(() => {
        getWeather().then(setWeather).catch(console.error);
    }, []);

    return (
        <div>
            <h2>Weather Info</h2>
            {weather.length > 0 ? (
                weather.map((item, index) =>  (
                    <WeatherCard
                        key={index}
                        date={item.date}
                        temperature={item.temperature}
                        summary={item.summary}
                        />
                ))
            ) : <p>Loading...</p>}
        </div>
    );
};

export default WeatherPage;