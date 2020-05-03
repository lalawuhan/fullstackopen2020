import React, { useState, useEffect } from "react";
import numbersService from "./services/numbersService";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
const App = () => {
    const [persons, setPersons] = useState([]);

    const [query, setQuery] = useState("");
    const handleSearch = (event) => {
        setQuery(event.target.value);
    };
    useEffect(() => {
        numbersService.getAll().then((response) => {
            setPersons(response.data);
        });
    }, []);

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter
                value={query}
                handleSearch={handleSearch}
                persons={persons}
            />
            <h2>Add a new person</h2>
            <PersonForm persons={persons} setPersons={setPersons} />
            <h2>Numbers</h2>
            <Persons persons={persons} query={query} setPersons={setPersons} />
        </div>
    );
};

export default App;
