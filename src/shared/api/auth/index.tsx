import { Route, Routes } from "react-router-dom";
import LoginPage from "../../../pages/LoginPgae/LoginPage";
import SignUpPage from '../../../pages/SignUpPage/SignUpPage';

const Index = () => {
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signUp" element={<SignUpPage />} />
        </Routes>
    );
}

export default Index;
