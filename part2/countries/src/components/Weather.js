import React, { useEffect, useState } from "react";
import axios from "axios";

const Weather = ({ country }) => {
    const api_key = process.env.REACT_APP_API_KEY;
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        axios
            .get(
                `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`
            )
            .then((response) => {
                setWeather(response.data);
            });
    }, []);

    if (weather == null) {
        return " ";
    } else {
        return (
            <div>
                <h2> Current Weather in {country.capital} </h2>
                <strong>
                    Weather today is: {weather.current.weather_descriptions[0]}
                </strong>
                <br />
                <strong>Temperature:</strong> {weather.current.temperature}
                <br />
                <img
                    src={weather.current.weather_icons[0]}
                    alt="weather icon"
                />{" "}
                <br />
                <strong>Wind:</strong>
                {weather.current.wind_speed} mph {weather.current.wind_dir}
            </div>
        );
    }
};

export default Weather;
