import React, { useState } from "react";
import { MachineProvider, useMachineContext } from "./fsm-library/MachineProvider";
import MovieComponent from "./components/MovieComponent.jsx";
import SearchResults from "./components/SearchResults.jsx";

const machine = {
    name: 'TV Show Tracker',
    initialState: 'idle',
    states: {
        idle: {
            transitions: {
                search: 'loading',
                clear: 'idle'
            },
        },
        loading: {
            transitions: {
                resolve: 'results',
                reject: 'error',
            },
        },
        results: {
            transitions: {
                select: 'show',
                search: 'loading',
                clear: 'idle'
            },
        },
        show: {
            transitions: {
                search: 'loading',
                clear: 'idle'
            },
        },
        error: {
            transitions: {
                'search': 'loading',
            },
        },
    },
};

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === 'test') {
    window.fetch = () => Promise.resolve({
        json: () => Promise.resolve([
            {
                show: {
                    id: 1,
                    name: "Friends",
                    summary: "A Classic TV show.",
                    image: { medium: "https://static.tvmaze.com/uploads/images/medium_portrait/340/850450.jpg" },
                    rating: { average: 8 },
                    premiered: "1994-09-22"
                }
            },
            {
                show: {
                    id: 2,
                    name: "The Office",
                    summary: "A mockumentary on a group of typical office workers.",
                    image: { medium: "https://static.tvmaze.com/uploads/images/medium_portrait/340/850450.jpg" },
                    rating: { average: 8.8 },
                    premiered: "2005-03-24"
                }
            }
        ])
    });
}

const SearchComponent = () => {
    const [state, transition] = useMachineContext();
    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);
    const [selectedShow, setSelectedShow] = useState(null);

    const handleSearch = async () => {
        if (search.length < 2) {
            return;
        }

        transition("search");

        try {
            const response = await fetch(`http://api.tvmaze.com/search/shows?q=${search}`);
            const data = await response.json();
            setResults(data.map(d => d.show));
            transition("resolve");
        } catch (error) {
            console.error(error);
            transition("reject");
        }
    };

    const handleShowSelect = (show) => {
        setSelectedShow(show);
        transition("select");
    }

    const handleClear = () => {
        setSearch("");
        setResults([]);
        setSelectedShow(null);
        transition('clear');
    };

    const handleChange = (e) => {
        setSearch(e.target.value);
    }

    const handleSearchKeyPress = (e) => {
        if (e.keyCode === 13) {
            handleSearch().catch(error => {
                console.error("An error occurred while searching shows", error);
            });
        }
    };

    return (
        <div className='search-component'>
            <input
                value={search}
                onChange={handleChange}
                onKeyDown={handleSearchKeyPress}
                placeholder="Search for TV Shows"
            />
            <button onClick={handleSearch} className="search-button">Search</button>
            {state === "loading" && <p>Loading...</p>}
            {state === "error" && <p>Error fetching data.</p>}
            {state === "results" && <SearchResults data={results} onClick={handleShowSelect}/>}
            {state === "show" && <MovieComponent show={selectedShow} />}
            {(state === "results" || state === "show") && <button onClick={handleClear} className="clear-button">Clear</button>}
        </div>
    );
};

const StateIndicator = () => {
    const [state] = useMachineContext();

    return <div className={`state-indicator ${state}`}><h2>{state.toUpperCase()}</h2></div>;
};

const App = () => {
    return (
        <MachineProvider machine={machine}>
            <StateIndicator />
            <SearchComponent />
        </MachineProvider>
    );
};

export default App;