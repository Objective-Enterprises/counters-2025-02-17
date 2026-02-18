import { useContext, useEffect, useState } from "react"
import { GeneralContext } from "./generalContext"
/*
- Heading with the total of all counters
- Button to reset all counters to 0
*/
export const Total = () => {
    const value = useContext(GeneralContext);
    const [ currentSum, setCurrentSum ] = useState(0);

    useEffect(() => {
        const newSum = value?.counterList.reduce((prev, current) => {
            return prev+current.value;
        }, 0)
        setCurrentSum(newSum === undefined ? 0 : newSum)
    }, [value?.counterList]);
    
    const resetCounterList = () => {
        if (value) {
            const newList = value.counterList.map((counter) => {
                return {
                    ...counter,
                    value: 0,
                }
            })
            value.setCounterList(newList);
        }
    }

    return (
        <div>
            <h4>Total num all counters</h4>
            Total: {currentSum}
            <br />
            <button
                onClick={resetCounterList}
            >Reset All Counters</button>
        </div>
        
    )
}