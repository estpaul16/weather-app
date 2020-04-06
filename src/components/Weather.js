import React from 'react';

const Weather = (props) => {

    return (
        <React.Fragment>
            <div className='general-information'>
                <h1 id='description'>{props.description}</h1>
                <h3 id='location'>{props.city}</h3>
            </div>
            <div className='detail-section'>
                <div className='temps'>
                    {props.temp !== "" ? (<h2 id='temp'>{props.temp}&deg;</h2>): null}
                    <div className="min-max">
                        {props.temp !== "" ? (<h5>{props.minTemp}&deg;</h5>) : null}
                        {props.temp !== "" ? (<h5>{props.maxTemp}&deg;</h5>) : null}
                    </div>
                </div>
                {props.temp !== "" ? (<h4 id='real-feel'>RealFeel {props.realFeel}&deg;</h4>) : null}
            </div>
        </React.Fragment>
    );
};

export default Weather;
