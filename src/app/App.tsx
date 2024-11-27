import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthPage } from "../pages/auth/";
import ProtectedRoute from "./routes/ProtectedRoute";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { restoreSession, refreshTokens } from "../store/slices/authSlice";
import { supabase } from "../utils/client";
import './styles/index.scss';
import LayoutWrapper from "../pages/layout-wrapper/ui/LayoutWrapper/LayoutWrapper";

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(restoreSession());

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "TOKEN_REFRESHED" && session) {
        dispatch(refreshTokens());
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [dispatch]);

  return (
    <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route element={<ProtectedRoute />}>
                <Route path="/main" element={<LayoutWrapper layout={'main'}></LayoutWrapper>} />
            </Route>
        </Routes>
  );
};

export default App;
