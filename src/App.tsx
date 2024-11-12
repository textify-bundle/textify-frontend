import { Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage/AuthPage";


const App = () => {
  return (
    <Routes>
    <Route path="/" element={<AuthPage />} />
    </Routes>
  );
};

export default App;
