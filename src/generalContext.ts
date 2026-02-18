import { createContext } from "react";


export interface Counter {
    value: number,
    link: string
}

export interface GeneralContextValue { 
    counterList: Counter[];
    setCounterList: (counterList: Counter[]) => void;
};

export const GeneralContext = createContext<GeneralContextValue | undefined>(undefined);