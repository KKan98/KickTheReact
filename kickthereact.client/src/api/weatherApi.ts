export async function getWeather() {
    const response = await fetch("WeatherForecast");
    if(!response.ok)
        throw new Error("Failed to fetch weather data");
    return response.json();
}