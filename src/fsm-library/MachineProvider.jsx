// eslint-disable-next-line no-unused-vars
import React, {createContext, useContext, useReducer} from "react";

export const MachineContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useMachineContext = () => useContext(MachineContext);
// eslint-disable-next-line react-refresh/only-export-components
const useFiniteStateMachine = (machine) => {
    const [state, transition] = useReducer((state, action) => {
        const currentStateDefinition = machine.states[state];
        const destinationTransition = currentStateDefinition.transitions[action];

        if (!destinationTransition) {
            throw new Error(`Machine '${machine.name}' does not have a transition from '${state}' using action '${action}'`);
        }

        return destinationTransition;
    }, machine.initialState);

    return [state, transition];
};

export const MachineProvider = ({ machine, children }) => {
    const fsm = useFiniteStateMachine(machine);

    return <MachineContext.Provider value={fsm}>{children}</MachineContext.Provider>;
};
