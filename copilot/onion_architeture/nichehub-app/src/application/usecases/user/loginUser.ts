import { IUserRepository } from '../../../domain/repositories/IUserRepository';
import { User } from '../../../domain/entities/User';

export const loginUser = async (email: string, password: string, userRepository: IUserRepository): Promise<User | null> => {
    try {
        const user = await userRepository.findByEmail(email);
        
        if (user && user.password === password) {
            // Here you would typically generate a JWT token or similar
            return user;
        }
        
        return null; // Invalid credentials
    } catch (error) {
        console.error('Login error:', error);
        throw new Error('Login failed');
    }
};