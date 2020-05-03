import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Countries from "./components/Countries";
const App = () => {
    const [countries, setCountries] = useState([]);

    const [query, setQuery] = useState("");
    const handleSearch = (event) => {
        setQuery(event.target.value);
    };

    useEffect(() => {
        axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
            setCountries(response.data);
        });
    }, []);

    return (
        <div>
            <h2>Countries</h2>
            <Filter
                value={query}
                handleSearch={handleSearch}
                countries={countries}
            />
            <Countries
                setCountries={setCountries}
                countries={countries}
                query={query}
            />
        </div>
    );
};

export default App;
