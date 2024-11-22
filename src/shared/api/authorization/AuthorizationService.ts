import { supabase } from "../../../utils/client";

export const AuthService = {
    async login(email: string, password: string) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        return { data, error };
    },

    async registration(email: string, password: string) {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });
        return { data, error };
    },

    async logout() {
        const { error } = await supabase.auth.signOut();
        return { error };
    },

    async refreshSession() {
        const { data, error } = await supabase.auth.refreshSession();
        return { data, error };
    },

    async getSession() {
        const { data, error } = await supabase.auth.getSession();
        return { data, error };
    }

    
};
