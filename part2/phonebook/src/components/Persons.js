import React from "react";

const Persons = ({ persons, query }) => {
    const contactsToShow = query
        ? persons.filter((person) => person.name.toLowerCase().match(query))
        : persons;
    return (
        <ul>
            {contactsToShow.map((person) => (
                <p key={person.id}>
                    {person.name} {person.number}
                </p>
            ))}
        </ul>
    );
};
export default Persons;
