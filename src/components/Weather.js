import React from 'react';
import '../style/style.css';

const Weather = (props) => {

    return (
        <React.Fragment>
            <div className='general-information'>
                <h1 id='description'>{props.description}</h1>
                <h3 id='location'>{props.city}</h3>
            </div>
            <div className='detail-section'>
                <div id='temps' className='detail'>
                    {(props.temp !== "") && <h2 id='temp'>{props.temp}&deg;</h2>}
                    <div className="min-max">
                        {(props.temp !== "") && <h5>{props.minTemp}&deg;</h5>}
                        {(props.temp !== "") && <h5>{props.maxTemp}&deg;</h5>}
                    </div>
                </div>
                {(props.temp !== "") && (<h4 id='real-feel' className='detail'>RealFeel {props.realFeel}&deg;</h4>)}
            </div>
        </React.Fragment>
    );
};

export default Weather;
