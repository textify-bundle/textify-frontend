import { supabase } from "../../shared/api/auth/client";

export default class AuthService{

   static async login(email:string, password: string) {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
          });
        return { data, error }
    }

    static async registration(email:string, password: string) {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
          });
        return { data, error }
    }
    
    static async logout() {
        const { error } = await supabase.auth.signOut();
        return { error }
    }
}