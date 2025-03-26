import React from "react";
import './Country.css';
const Country = ({ country }) => {
    return (
        // Add the following JSX code:
        <div className="country">
            <img src={country.flags.png} alt="Movie" />

            <div>
                <h2>{country.name.common}</h2>
                <p>Official Name : {country.name.official}</p>
                <p> Independent : {country.independent ? 'Yes' : 'No'}</p>
                <p> Population : {country.population}</p>
                <div>
                    <p>Short Name: {country.cca2}</p>
                </div>
            </div>
        </div>
    );
};

export default Country;
