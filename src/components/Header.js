import React, { useState } from 'react';
import ReactAnimatedWeather from 'react-animated-weather';
import '../style/style.css';


// const defaults = {
//   icon: 'CLEAR_DAY',
// animate: true,
//   size: 64,
//   color: 'black'
// };

const Header = (props) => {
    const getIcon = (rangeId) => {
        switch (true) {
            case rangeId >= 200 && rangeId <= 531:
                return 'RAIN'
            case rangeId >= 611 && rangeId <= 613:
                return 'SLEET';
            case rangeId >= 600 && rangeId <= 622:
                return 'SNOW';
            case rangeId >= 701 && rangeId <= 781:
                return 'FOG';
            case rangeId === 800:
                return 'CLEAR_DAY';
            case rangeId === 801:
                return 'PARTLY_CLOUDY_DAY';
            case rangeId >= 802 && rangeId <= 804:
                return 'CLOUDY';
            default:
                return 'CLOUDY';
        }
    };

    return (
        <div className='header'>
            <div className='icon-container'>
                <ReactAnimatedWeather icon={getIcon(props.iconId)} color='gold'/>
            </div>
        </div>
    );
};

export default Header;
