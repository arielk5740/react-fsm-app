import React from "react";
import parse from "html-react-parser";

const MovieComponent = ({ show }) => {
    return (
        <div>
            <h2>{show.name}</h2>
            {show.summary && <div>{parse(show.summary)}</div>}
            {show.image?.medium && <img src={show.image.medium} alt={show.name} />}
            <p>Rating: {show.rating?.average || "N/A"}</p>
            <p>Premiered: {show.premiered || "N/A"}</p>
        </div>
    );
};

export default MovieComponent;