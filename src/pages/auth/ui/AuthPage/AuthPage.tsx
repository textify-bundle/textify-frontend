import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; 
import { signIn, signUp } from "../../../../store/slices/authSlice";
import { AppDispatch, RootState } from "../../../../store";
import AuthorizationHeader from "../../../../shared/ui/auth/components/AuthorizationHeader";
import AuthorizationForm from "../../../../shared/ui/auth/components/AuthorizationForm";
import AuthorizationSwitch from "../../../../shared/ui/auth/components/AuthorizationSwitch";
import './AuthPage.scss';


const AuthPage: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const dispatch = useDispatch<AppDispatch>();
  const { user, error } = useSelector((state: RootState) => state.auth);  
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
    <div className='auth-page-container'>
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
      <AuthorizationHeader isSignUp={isSignUp} />
      <AuthorizationForm
        formData={formData}
        setFormData={setFormData}
        isLoading={isLoading}
        isSignUp={isSignUp}
        handleAuth={handleAuth}
        error={error}
      />
      <AuthorizationSwitch isSignUp={isSignUp} toggleMode={toggleMode} />
    </Box>
    <Button>
      
    </Button>
    </div>
  );
};

export default AuthPage;
