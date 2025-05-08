import { supabase } from './client';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { User } from '../../domain/entities/User';

export class UserRepository implements IUserRepository {
    async registerUser(email: string, username: string, password: string): Promise<User | null> {
        const { user, error } = await supabase.auth.signUp({
            email,
            password,
            data: { username },
        });

        if (error) {
            console.error('Error registering user:', error);
            return null;
        }

        return new User(user.id, username, email);
    }

    async loginUser(email: string, password: string): Promise<User | null> {
        const { user, error } = await supabase.auth.signIn({
            email,
            password,
        });

        if (error) {
            console.error('Error logging in user:', error);
            return null;
        }

        return new User(user.id, user.user_metadata.username, email);
    }

    async fetchUserById(userId: string): Promise<User | null> {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', userId)
            .single();

        if (error) {
            console.error('Error fetching user:', error);
            return null;
        }

        return new User(data.id, data.username, data.email);
    }

    async updateUser(userId: string, updates: Partial<User>): Promise<User | null> {
        const { data, error } = await supabase
            .from('users')
            .update(updates)
            .eq('id', userId)
            .single();

        if (error) {
            console.error('Error updating user:', error);
            return null;
        }

        return new User(data.id, data.username, data.email);
    }
}