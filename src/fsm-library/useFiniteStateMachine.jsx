import { useReducer } from "react";

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


export default useFiniteStateMachine;