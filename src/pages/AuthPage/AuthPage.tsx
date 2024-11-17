import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; 
import { signIn, signUp } from "../../store/slices/authSlice";
import { AppDispatch, RootState } from "../../store";
import AuthHeader from "../../shared/ui/auth/components/AuthHeader";
import AuthForm from "../../shared/ui/auth/components/AuthForm";
import UserInfo from "../../shared/ui/auth/components/UserInfo";
import AuthSwitch from "../../shared/ui/auth/components/AuthSwitch";
import './authPage.scss';
const AuthPage: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const dispatch = useDispatch<AppDispatch>();
  const { user, session, error } = useSelector((state: RootState) => state.auth);  
  const navigate = useNavigate(); 

  useEffect(() => {
    if (user) {
      navigate("/main");  
    }
  }, [user, navigate]);  

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

    <Box className="auth-page" sx={{ padding: "20px", maxWidth: "400px", margin: "auto", mt: 5 }}>
        <Button sx={{
        color:'white',
        fontSize:'13px',
        position: 'absolute',
        top: '35px',
        left: '108px',  
        background: '#0751D8',
        width: '90px',
        height: '37px',
        display: 'flex',   
        justifyContent: 'center', 
        alignItems: 'center',   
      }}>
        Textify
      </Button>
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
