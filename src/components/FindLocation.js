import React, { useState } from 'react';

// Import React Script Library to load Google object
import Script from 'react-load-script';

const FindLocation = (props) => {

    const handleScriptLoad = () => {
        // Declare Options For Autocomplete
        const options = { types: [ '(cities)' ] };

        // Initialize Google Autocomplete
        /*global google*/
        const autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'), options);

        // Avoid paying for data that you don't need by restricting the
        // set of place fields that are returned to just the address
        // components and formatted address
        autocomplete.setFields([ 'address_components', 'formatted_address', 'geometry' ]);

        // Fire Event when a suggested name is selected
        autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            if (place == null) return;
            const lat = place.geometry.location.lat();
            const long = place.geometry.location.lng();
            // pass data on searched city up to App
            props.updateCity(place.formatted_address, lat, long);
        });
    };

    return (
        <div>
            <Script
                url='https://maps.googleapis.com/maps/api/js?key=AIzaSyCLBAzecKt6edxdHOZcxmXQjlCtPsVAd-Y&libraries=places'
                onLoad={handleScriptLoad}
            />
            <input type='text' id='autocomplete' placeholder='Search City' defaultValue={''} />
        </div>
    );
};

export default FindLocation;
