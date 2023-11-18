# FSM-Library Vite.js Project

This project is a sample application to demonstrate the use of finite state machine library
(fsm-library) with React hooks in a Vite.js project.

## Finite State Machine Structure

The finite state machine used in this library is an object structure which defines the machine name, initial state and possible states and transitions. Here's the structure:
```json
{
  "name": "machine_name",
  "initialState": "initial_state_name",
  "states": {
    "state_1": {
      "transitions": {
        "action_1": "state_2",
        "action_2": "state_3"
      }
    },
    "state_2": {
      "transitions": {
        "action_3": "state_1"
      }
    }
  }
}
```

## Overview

The application fetches a list of Pokemon from an API and displays it. It uses a finite state
machine to manage the different states of this process including idle, loading, data and error states.

## Libraries used

- fsm-library: A small library providing a custom React hook to use finite state machine.
- Vite.js: A modern front-end build tool, created for the sole purpose of improving the frontend
  development experience.
- React: A JavaScript library for creating user interfaces.

## FSM-Library Integration

The fsm-library provides three parts:

* MachineProvider: This component wraps around components that will use the finite state machine.
* useMachineContext: This hook is used in components that want to access the finite state machine's
  state and transition method.
* useFiniteStateMachine: The custom React hook implementing the finite state machine.

## Project structure
The `src` folder contains:

**App.jsx:** The main component and entry point of the application

**fsm-library:** The folder containing the finite state machine library files

## Running the application

To run the application:

1. Install nodejs and npm from the official website.
2. Clone this repository.
3. Navigate to the root directory of the cloned repository on your terminal.
4. Run `npm install` to install all the necessary dependencies.
5. Run `npm run dev` to start the development server.

## Testing the application

To test the fsm-library:

1. Run `npm install` to install all the necessary dependencies.
2. Run `npm run test` to start the test suite.

## Offline Mock Server

For offline development and testing, this application uses a mock server. 
This is accomplished by overwriting the global `fetch` method to return a fixed set of data. 
When `process.env.NODE_ENV` is set to 'test', `fetch` calls will return the mocked data, effectively simulating server responses.