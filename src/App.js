import React, { useState, useEffect } from 'react';
import FindLocation from './components/FindLocation';

const App = () => {
    const [ selectedCity, setSelectedCity ] = useState('');
    const [ selectedLong, setSelectedLong ] = useState('');
    const [ selectedLat, setSelectedLat ] = useState('');

    const updateCity = (city, lat, long) => {
        setSelectedCity(city);
        setSelectedLat(lat);
        setSelectedLong(long);
    };

    return (
        <div className='App'>
            <FindLocation updateCity={updateCity} />
        </div>
    );
};

export default App;
