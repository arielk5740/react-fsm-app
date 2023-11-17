// eslint-disable-next-line no-unused-vars
import React, { createContext } from "react";
import useFiniteStateMachine from "./useFiniteStateMachine";

export const MachineContext = createContext();

const MachineProvider = ({ machine, children }) => {
    const fsm = useFiniteStateMachine(machine);
    return <MachineContext.Provider value={fsm}>{children}</MachineContext.Provider>;
};

export default MachineProvider;