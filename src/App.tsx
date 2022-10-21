import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main/Main";
import Photos from "./pages/Photos/Photos";

// możemy tutaj zrobić tak
const App = () => (
    <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/photos/:query" element={<Photos />} />
        <Route path="*" />
    </Routes>
);

export default App;
