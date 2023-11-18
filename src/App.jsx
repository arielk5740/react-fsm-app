import React from 'react';
import {MachineProvider, useMachineContext}  from "./fsm-library/MachineProvider";

const machine = {
    name: 'Pokemon Fetching',
    initialState: 'idle',
    states: {
        idle: {
            transitions: {
                fetch: 'loading',
            },
        },
        loading: {
            transitions: {
                resolve: 'data',
                reject: 'error',
            },
        },
        data: {
            transitions: {
                fetch: 'loading',
                clear: 'idle'
            },
        },
        error: {
            transitions: {
                fetch: 'loading',
            },
        },
    },
};

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === 'test') {
    window.fetch = () =>
        Promise.resolve({
            json: () => Promise.resolve({
                results: [
                    { name: "pokemon1", url: "https://pokeapi.co/api/v2/pokemon/1/" },
                    { name: "pokemon2", url: "https://pokeapi.co/api/v2/pokemon/2/" }
                ]
            })
        });
}


const PokemonComponent = () => {
    const [state, transition] = useMachineContext();
    const [data, setData] = React.useState([]);

    const fetchData = async () => {
        transition('fetch');
        setTimeout(async () => {
            try {
                const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10&offset=0');
                const {results} = await res.json();
                setData(results);
                transition('resolve');
            } catch (e) {
                console.error(e);
                transition('reject');
            }
        }, 2000);
    }

    const clearData = () => {
        transition('clear');
    };

    return (
        <div>
            <h1>Pokemon List</h1>
            {state === "loading" && <div className="loader"></div>}
            {state === "data" && <button onClick={clearData} className="clear-button">Clear Data</button>}
            {state === "data" && data.map((pokemon, i) => (
                <div key={i} className="pokemon">
                    <h4>{pokemon.name}</h4>
                    <a target="/_blank" href={pokemon.url}>{pokemon.url}</a>
                </div>
            ))}
            {state === "error" && <div>Error fetching data</div>}
            {state === "idle" && <button onClick={fetchData}>Fetch Pokemon</button>}
        </div>
    );
};

const ShowStateComponent = () => {
    const [state, ] = useMachineContext();

    return (
        <div className={`status status-${state}`}>
            Current State: {state}
        </div>
    );
};

const MainComponent = ({children}) => {
    return (
        <div className="main">
            {children}
        </div>
    );
};

const App = () => {
    return (
        <MachineProvider machine={machine}>
            <MainComponent>
                <PokemonComponent />
                <ShowStateComponent />
            </MainComponent>
        </MachineProvider>
    );
};

export default App;