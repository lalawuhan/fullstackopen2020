import React from "react";

const Filter = ({ query, handleSearch }) => {
    return (
        <>
            Search for <input value={query} onChange={handleSearch} />
        </>
    );
};
export default Filter;
