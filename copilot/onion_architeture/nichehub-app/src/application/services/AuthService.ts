import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { User } from '../../domain/entities/User';
import { supabase } from '../supabase/client';

export class AuthService {
    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async register(email: string, username: string, password: string): Promise<User | null> {
        const { user, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            console.error('Registration error:', error);
            return null;
        }

        const newUser = new User(user.id, username, email);
        await this.userRepository.create(newUser);
        return newUser;
    }

    async login(email: string, password: string): Promise<User | null> {
        const { user, error } = await supabase.auth.signIn({
            email,
            password,
        });

        if (error) {
            console.error('Login error:', error);
            return null;
        }

        return this.userRepository.findById(user.id);
    }

    async logout(): Promise<void> {
        await supabase.auth.signOut();
    }

    async getCurrentUser(): Promise<User | null> {
        const user = supabase.auth.user();
        if (user) {
            return this.userRepository.findById(user.id);
        }
        return null;
    }
}