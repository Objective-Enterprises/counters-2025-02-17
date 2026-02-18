import { BrowserRouter, Link } from "react-router-dom";
import Router from "./Router";
import { GeneralContext, type Counter, type GeneralContextValue } from "./generalContext";
import { useState } from "react";

export default function App () {
  const [counterList, setCounterList] = useState<Counter[]>([]);

  const initialValue: GeneralContextValue = {
      counterList,
      setCounterList,
  }

  return (
    <>
    <h1>Hello World!</h1>
      <BrowserRouter>
      < GeneralContext value={initialValue} >
        <div><
          Link to="/">Go Home</Link> | <Link to="/total">Go to Total</Link>
        </div>
        <Router/>
      </GeneralContext>
      </BrowserRouter>
    </>
  )
}