import React, { useState, useEffect } from 'react';
import FindLocation from './components/FindLocation';
import Weather from './components/Weather';
import Header from './components/Header';
import Axios from 'axios';
import ReactAnimatedWeather from 'react-animated-weather';
import './style/style.css';

const openWeatherApiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;

const App = () => {
    // data from google places api
    const [ selectedCity, setSelectedCity ] = useState('');
    const [ selectedLong, setSelectedLong ] = useState('');
    const [ selectedLat, setSelectedLat ] = useState('');

    // data from openWeatherApi
    const [ currentTemp, setCurrentTemp ] = useState('');
    const [ realFeel, setRealFeel ] = useState('');
    const [ minTemp, setMinTemp ] = useState('');
    const [ maxTemp, setMaxTemp ] = useState('');
    const [ weatherDescription, setWeatherDiscription ] = useState('');
    const [ forecast, setForecast ] = useState([]); // for later
    const [ iconCode, setIconCode ] = useState('');
    const [ isInitialRender, setIsInitialRender ] = useState(true);

    // Asks user for access to their location on initialization
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setSelectedLong(position.coords.longitude);
                setSelectedLat(position.coords.latitude);
                setIsInitialRender(false);
            });
        }
    }, []);

    useEffect(
        () => {
            // If the page is being rendered for the first time and we don't have
            // access to the user's location, we don't want to make a fetch call
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
                setIconCode(weather.icon);
                if (selectedCity === '') {
                    setSelectedCity(response.data.name);
                }
            });
        },
        // These are the last to be updated from updateCity, so rerender after them
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

    return (
        <div className='App'>
            <div className='container'>
                <Header iconId={iconCode}/>
                <div className='content'>
                    <Weather
                        city={selectedCity}
                        temp={currentTemp}
                        minTemp={minTemp}
                        maxTemp={maxTemp}
                        realFeel={realFeel}
                        description={weatherDescription}
                        iconCode={iconCode}
                    />
                    <FindLocation updateCity={updateCity} />
                </div>
            </div>
        </div>
    );
};

export default App;
