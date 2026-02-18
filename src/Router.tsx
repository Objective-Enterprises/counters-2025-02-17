import { Routes, Route } from "react-router-dom"
import { Home } from "./Home";
import { Total } from "./Total";
import { Counter } from "./Counter";

export default function Router() {
    // const value = useContext(GeneralContext);
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/total" element={<Total/>}/>
            <Route path="/counter/:idx" element={<Counter/>}/>
        </Routes>
    )
}