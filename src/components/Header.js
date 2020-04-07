import React, { useState } from 'react';
import ReactAnimatedWeather from 'react-animated-weather';
import '../style/style.css';

let iconSettings = {
    animate : true,
    size    : 100,
    color   : 'black'
};

const Header = (props) => {
    const getIcon = (rangeId) => {
        switch (true) {
            case rangeId >= 200 && rangeId <= 531:
                iconSettings.color = 'blue'
                return 'RAIN';
            case rangeId >= 611 && rangeId <= 613:
                iconSettings.color = 'blue'
                return 'SLEET';
            case rangeId >= 600 && rangeId <= 622:
                iconSettings.color = '#0bcaf4'
                return 'SNOW';
            case rangeId >= 701 && rangeId <= 781:
                iconSettings.color = 'grey'
                return 'FOG';
            case rangeId === 800:
                iconSettings.color = '#ffbe00'
                return 'CLEAR_DAY';
            case rangeId === 801:
                iconSettings.color = 'black'
                return 'PARTLY_CLOUDY_DAY';
            case rangeId >= 802 && rangeId <= 804:
                iconSettings.color = '#828282'
                return 'CLOUDY';
            default:
                return 'CLOUDY';
        }
    };

    const colorForIcon = (icon) => {

    }

    return (
        <div className='header'>
            <div className='icon-container'>
                <ReactAnimatedWeather icon={getIcon(props.iconId)} color={iconSettings.color} size={100} />
            </div>
        </div>
    );
};

export default Header;
