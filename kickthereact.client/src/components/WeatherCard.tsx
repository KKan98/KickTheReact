import React from "react";

interface WeatherProps {
    date: string;
    temperature: number;
    summary: string;
}

const WeatherCard: React.FC<WeatherProps> = ({date, temperature, summary}) => {
    return (
        <div>
            <h3>Weather</h3>
            <p>{date} - {temperature} - {summary}</p>
        </div>
    );
};

export default WeatherCard;