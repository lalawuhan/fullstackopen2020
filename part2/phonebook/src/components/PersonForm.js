import React, { useState } from "react";
import numbersService from "../services/numbersService";
import Notification from "./Notification";
const PersonForm = ({ persons, setPersons }) => {
    const [newName, setNewName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [message, setMessage] = useState("");
    const addPerson = (event) => {
        event.preventDefault();

        const result = persons.find(({ name }) => name === newName);
        const personObj = {
            name: newName,
            id: persons.length + 1,
            number: phoneNumber,
        };

        if (result === undefined) {
            numbersService.create(personObj).then((response) => {
                setPersons(persons.concat(response.data));
                setMessage(`Success: Added ${response.data.name}`);
                setTimeout(() => {
                    setMessage(null);
                }, 5000);
            });
        } else if (
            window.confirm(
                `${newName} is already added to phonebook, replace the old number with the new number?`
            )
        ) {
            numbersService
                .update(result.id, personObj)
                .then((response) => {
                    setPersons(
                        persons.map((person) =>
                            person.id === result.id ? response.data : person
                        )
                    );
                    setMessage(`Success : Updated ${result.name}`);
                    setTimeout(() => {
                        setMessage(null);
                    }, 5000);
                })
                .catch((error) => {
                    setMessage(
                        `Info: ${result.name} was already deleted from the server`
                    );
                    setTimeout(() => {
                        setMessage(null);
                    }, 5000);
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
        <div>
            <Notification message={message} />
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
        </div>
    );
};
export default PersonForm;
