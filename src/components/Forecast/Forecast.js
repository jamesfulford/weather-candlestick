import React, { useState } from 'react';
import Conditions from '../Conditions/Conditions';
import {
    Radio,
    Button
} from './Forecast.module.css';

const Forecast = () => {
    const [lat, lon] = [42.99, -71.46]
    let [unit, setUnit] = useState('imperial');
    let [responseObj, setResponseObj] = useState({});
    let [error, setError] = useState(false);
    let [loading, setLoading] = useState(false);

    function getForecast(e) {
        e.preventDefault();

        // Clear state in preparation for new data
        setError(false);
        setResponseObj({});
        
        setLoading(true);

        fetch(`https://community-open-weather-map.p.rapidapi.com/forecast/daily?lat=${lat}&lon=${lon}&cnt=16&units=${unit}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": process.env.REACT_APP_API_KEY,
                "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
            }
        })
        .then(response => response.json())
        .then(response => {
            if (Number(response.cod) !== 200) {
                throw new Error()
            }

            setResponseObj(response);
            setLoading(false);
        })
        .catch(err => {
            setError(true);
            setLoading(false);
            console.log(err.message);
        });
    }

    return (
        <div>
            <h2>Find Current Weather Conditions</h2>
            <form onSubmit={getForecast}>
                <label className={Radio}>
                    <input
                        type="radio"
                        name="units"
                        checked={unit === "imperial"}
                        value="imperial"
                        onChange={(e) => setUnit(e.target.value)}
                        />
                    Fahrenheit
                </label>
                <label className={Radio}>
                    <input
                        type="radio"
                        name="units"
                        checked={unit === "metric"}
                        value="metric"
                        onChange={(e) => setUnit(e.target.value)}
                        />
                    Celcius
                </label>

                <button className={Button} type="submit">Get Forecast</button>
            </form>
            <Conditions
               responseObj={responseObj}
               error={error}
               loading={loading}
               />
        </div>
    )
}

export default Forecast;