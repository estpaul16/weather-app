import React, { useState, useEffect } from 'react';
import FindLocation from './components/FindLocation';
import Weather from './components/Weather';
import Axios from 'axios';

const openWeatherApiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;

const App = () => {
    const [ selectedCity, setSelectedCity ] = useState('');
    const [ selectedLong, setSelectedLong ] = useState('');
    const [ selectedLat, setSelectedLat ] = useState('');
    const [ currentTemp, setCurrentTemp ] = useState('');
    const [ realFeel, setRealFeel ] = useState('');
    const [ minTemp, setMinTemp ] = useState('');
    const [ maxTemp, setMaxTemp ] = useState('');
    const [ weatherDescription, setWeatherDiscription ] = useState('');
    const [ forecast, setForecast ] = useState([]);
    const [ isInitialRender, setIsInitialRender ] = useState(true);

    useEffect(
        () => {
            // If the page is being rendered for the first time we don't want to make a fetch call
            if (isInitialRender) return;
            Axios.get(
                `http://api.openweathermap.org/data/2.5/weather?lat=${selectedLat}&lon=${selectedLong}&appid=${openWeatherApiKey}`
            ).then((response) => {
                const weather = response.data.weather[0];
                const temps = response.data.main;
                console.log(response);
                setWeatherDiscription(weather.description);
                setCurrentTemp(kelvinsToFahrenheit(temps.temp));
                setRealFeel(kelvinsToFahrenheit(temps.feels_like));
                setMinTemp(kelvinsToFahrenheit(temps.temp_min));
                setMaxTemp(kelvinsToFahrenheit(temps.temp_max));
            });
        },
        // These are the last to be updated, so rerender after them
        [ selectedLong, isInitialRender ]
    );

    const updateCity = (city, lat, long) => {
        setSelectedCity(city);
        setSelectedLat(lat);
        setSelectedLong(long);
        setIsInitialRender(false);
    };

    const kelvinsToFahrenheit = (degKel) => {
        const celsius = degKel - 273.15;
        const fahr = celsius * (9 / 5) + 32;
        return Math.round(fahr);
    };

    const getWeather = () => {
        Axios.get(
            `http://api.openweathermap.org/data/2.5/weather?lat=${selectedLat}&lon=${selectedLong}&appid=${openWeatherApiKey}`
        ).then((response) => {
            console.log(response);
        });
    };

    return (
        <div className='App'>
            <Weather />
            <FindLocation updateCity={updateCity} />
        </div>
    );
};

export default App;
