import { supabase } from "../../utils/client";

export const AuthService = {
    async login(email: string, password: string) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });
        return { data, error };
    },

    async registration(email: string, password: string) {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        });
        return { data, error };
    },
    
    async logout() {
        const { error } = await supabase.auth.signOut();
        return { error };
    }
};
