import React from "react";
import numbersService from "../services/numbersService";

const Persons = ({ persons, query, setPersons }) => {
    const contactsToShow = query
        ? persons.filter((person) => person.name.toLowerCase().match(query))
        : persons;
    const handleDelete = (person) => {
        if (window.confirm(`Delete ${person.name}?`)) {
            let id = person.id;

            numbersService
                .deleteNumber(id)
                .then(() => {
                    setPersons(persons.filter((x) => x.id !== id));
                })
                .catch((error) => {
                    alert(`error in deleting ${person.name} : ${error}`);
                });
        } else return;
    };
    return (
        <ul>
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
