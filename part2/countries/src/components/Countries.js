import React from "react";
import Weather from "./Weather";

const Countries = ({ countries, query, setCountries }) => {
    const countriesToShow = query
        ? countries.filter((country) => {
              return country.name.toLowerCase().match(query);
          })
        : countries;

    if (countriesToShow.length > 10) {
        return <p>Too many matches, please be more specific</p>;
    } else if (countriesToShow.length > 1) {
        return (
            <>
                <ul>
                    {countriesToShow.map((country) => (
                        <div key={country.alpha2Code}>
                            <p>{country.name}</p>
                            <button
                                value={country}
                                onClick={() => {
                                    setCountries([country]);
                                }}
                            >
                                show
                            </button>
                        </div>
                    ))}
                </ul>
            </>
        );
    } else
        return (
            <ul>
                {countriesToShow.map((country) => (
                    <div key={country.alpha2Code}>
                        <h1> {country.name}</h1>
                        <p>Capital: {country.capital}</p>
                        <p>Population: {country.population}</p>
                        <h1>languages</h1>
                        <ul>
                            {country.languages.map((language) => (
                                <li key={language.name}>{language.name}</li>
                            ))}
                        </ul>
                        <img
                            src={country.flag}
                            alt="countrys flag"
                            width="100px"
                        />{" "}
                        <Weather country={country} />
                    </div>
                ))}
            </ul>
        );
};
export default Countries;
