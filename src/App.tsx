import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPgae/LoginPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";


const App = () => {

  return (
    <Routes>
    <Route path="/" element={<LoginPage />} />
    <Route path="/signUp" element={<SignUpPage />} />
</Routes>
  );
};

export default App;