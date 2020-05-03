import React, { useState } from "react";
import numbersService from "../services/numbersService";
import Notification from "./Notification";

const Persons = ({ persons, query, setPersons }) => {
    const contactsToShow = query
        ? persons.filter((person) => person.name.toLowerCase().match(query))
        : persons;
    const [message, setMessage] = useState("");

    const handleDelete = (person) => {
        if (window.confirm(`Delete ${person.name}?`)) {
            let id = person.id;

            numbersService
                .deleteNumber(id)
                .then(() => {
                    setPersons(persons.filter((x) => x.id !== id));
                })
                .catch((error) => {
                    setMessage(
                        `Info: error in deleting ${person.name}. They have already been deleted. `
                    );
                    setTimeout(() => {
                        setMessage(null);
                    }, 5000);
                });
        } else return;
    };
    return (
        <ul>
            <Notification message={message} />

            {contactsToShow.map((person) => (
                <div key={person.id}>
                    <p>
                        {person.name} {person.number}
                    </p>
                    <button
                        key={person.name}
                        onClick={() => handleDelete(person)}
                    >
                        delete
                    </button>
                </div>
            ))}
        </ul>
    );
};
export default Persons;
