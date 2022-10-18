import { Routes, Route } from "react-router-dom";
import { Main } from "./pages/Main";
import { Photos } from "./pages/Photos";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/photos/:query" element={<Photos />} />
                <Route path="*" />
            </Routes>
        </>
    );
}

export default App;
