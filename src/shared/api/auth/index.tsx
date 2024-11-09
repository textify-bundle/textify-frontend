import { Route, Routes } from "react-router-dom";
import LoginPage from "../../../widgets/pages/LoginPage";
import SignUpPage from '../../../widgets/pages/SignUpPage';

const Index = () => {
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signUp" element={<SignUpPage />} />
        </Routes>
    );
}

export default Index;
