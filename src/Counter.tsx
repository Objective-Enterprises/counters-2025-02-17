import { useContext, useEffect, useState } from "react";
import { GeneralContext } from "./generalContext";
import { useLocation } from "react-router-dom";
/*
- Heading with the counter's current value
- Button to increment the counter
*/
export const Counter = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    const extractCounterIdxFromLink = (link: string) => {
        const splitLink = link.split("/");
        const idx = splitLink[splitLink.length-1];
        return parseInt(idx);
    }
    const idx = extractCounterIdxFromLink(currentPath);

    const value = useContext(GeneralContext);
    const [currentValue, setCurrentValue] = useState(0);

    useEffect(() => {
        if (value) {
            const latestValue = value.counterList[idx].value;
            setCurrentValue(latestValue);
        }
    }, [value?.counterList]) //[value?.counterList[idx]] didn't work


    const incrementCounter = () => {
        if (value) {
            const newValue = value.counterList[idx].value + 1;
            const newList = [...value.counterList];
            newList[idx].value = newValue;
            value.setCounterList(newList)
        }
    }

    return <div>
        <h3>
            Value: {currentValue}
        </h3>
        <button
            onClick={incrementCounter}
        >Increment</button>
    </div>
}