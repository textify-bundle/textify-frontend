import React, { useState } from "react";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { signIn, signUp } from "../../store/slices/authSlice";
import { AppDispatch, RootState } from "../../store";
import AuthForm from "../../shared/ui/auth/components/AuthForm";
import UserInfo from "../../shared/ui/auth/components/UserInfo";
import AuthHeader from "../../shared/ui/auth/components/AuthHeader";
import AuthSwitch from "../../shared/ui/auth/components/AuthSwitch";
import "./authPage.scss";

const AuthPage: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const dispatch = useDispatch<AppDispatch>();
  const { user, session, error } = useSelector((state: RootState) => state.user);

  const handleAuth = async () => {
    setIsLoading(true);
    try {
      if (isSignUp) {
        await dispatch(signUp(formData)).unwrap();
      } else {
        await dispatch(signIn(formData)).unwrap();
      }
    } catch (err) {
      console.error(isSignUp ? "Sign-up error:" : "Sign-in error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => setIsSignUp((prev) => !prev);

  return (
    <Box className="auth-page" sx={{ backgroundColor: "white", padding: "30px", borderRadius: 2, width: "300px" }}>
      <AuthHeader isSignUp={isSignUp} />
      <AuthForm
        formData={formData}
        setFormData={setFormData}
        isLoading={isLoading}
        isSignUp={isSignUp}
        handleAuth={handleAuth}
        error={error}
      />
      {user && <UserInfo user={user} session={session} />}
      <AuthSwitch isSignUp={isSignUp} toggleMode={toggleMode} />
    </Box>
  );
};

export default AuthPage;
