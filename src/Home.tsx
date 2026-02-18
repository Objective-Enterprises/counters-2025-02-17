import { useContext, useEffect } from "react"; 
import { GeneralContext, type Counter } from "./generalContext";
import { Link } from "react-router-dom";



const LinkComponent = ({counter}: {counter: Counter}) => {
    return <Link to={counter.link}>{counter.link}</Link>    
    }

/*
- Button to create a new counter starting at 0
- List of counters with their current value and a link to their page
*/
export const Home = () => {

    const value = useContext(GeneralContext);
    
    return (
        <div>
            List of counters:
            <ul>
                {value?.counterList.map((counter, idx) => {
                    return <li key={idx}> Value: {counter.value}, Link: <LinkComponent counter={counter}/>
                    </li>
                })}

            </ul>
            <button
                onClick={() => {
                    if (value) {
                        const newList = [...value.counterList, { value: 0, link: `/counter/${value.counterList.length}`}];
                        value.setCounterList(newList);
                    }
                }}

            >Create New Counter</button>
        </div>
    )
}