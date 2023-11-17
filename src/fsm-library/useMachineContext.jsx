import { useContext } from "react";
import { MachineContext } from "./MachineProvider";

const useMachineContext = () => useContext(MachineContext);

export default useMachineContext;