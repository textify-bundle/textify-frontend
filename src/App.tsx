import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage/AuthPage";
import LayoutWrapper from "./pages/LayoutWrapper/LayoutWrapper";
import ProtectedRoute from "./app/ProtectedRoute";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store";
import { restoreSession, refreshTokens } from "./store/slices/authSlice";
import { supabase } from "./utils/client";

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
        <Route path="/main" element={<LayoutWrapper />} />
      </Route>
    </Routes>
  );
};

export default App;
