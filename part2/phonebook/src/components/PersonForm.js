import React, { useState } from "react";
import numbersService from "../services/numbersService";
const PersonForm = ({ persons, setPersons }) => {
    const [newName, setNewName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const addPerson = (event) => {
        event.preventDefault();

        const result = persons.find(({ name }) => name === newName);
        console.log("result here", result);
        const personObj = {
            name: newName,
            id: persons.length + 1,
            number: phoneNumber,
        };

        if (result === undefined) {
            numbersService.create(personObj).then((response) => {
                setPersons(persons.concat(response.data));
            });
        } else if (
            window.confirm(
                `${newName} is already added to phonebook, replace the old number with the new number?`
            )
        ) {
            numbersService
                .update(result.id, personObj)
                .then((response) => {
                    console.log("response update", response);
                    setPersons(
                        persons.map((person) =>
                            person.id === result.id ? response.data : person
                        )
                    );
                })
                .catch((error) => {
                    alert(
                        ` ${result.name} was already deleted from the server`
                    );
                });
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
