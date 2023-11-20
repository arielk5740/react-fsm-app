import React from "react";

const SearchResults = ({ data, onClick }) => {
    return (
        <div>
            {data.map(show => {
                return (
                    <button key={show.id} onClick={() => onClick(show)}>{show.name}</button>
                )
            })}
        </div>
    );
};

export default SearchResults;