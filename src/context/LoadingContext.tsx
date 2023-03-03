import { createContext } from "react";

type LoadingContextType = [boolean, (loading: boolean) => void];

export default createContext<LoadingContextType>([true, () => {}]);
