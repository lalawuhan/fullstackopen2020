import React, { useState } from "react";

const PersonForm = ({ persons, setPersons }) => {
    const [newName, setNewName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const addPerson = (event) => {
        event.preventDefault();
        const result = persons.find(({ name }) => name === newName);
        if (result === undefined) {
            const personObj = {
                name: newName,
                id: persons.length + 1,
                number: phoneNumber,
            };
            setPersons(persons.concat(personObj));
        } else {
            alert(`${newName} is already added to phonebook`);
        }
        setNewName("");
        setPhoneNumber("");
    };
    const handleNameChange = (event) => {
        setNewName(event.target.value);
    };

    const handlePhoneNumber = (event) => {
        setPhoneNumber(event.target.value);
    };
    return (
        <form onSubmit={addPerson}>
            <div>
                name: <input value={newName} onChange={handleNameChange} />
            </div>
            <div>
                number:{" "}
                <input value={phoneNumber} onChange={handlePhoneNumber} />
            </div>

            <div>
                <button type="submit">add</button>
            </div>
        </form>
    );
};
export default PersonForm;
