import { IUserRepository } from '../../../domain/repositories/IUserRepository';
import { User } from '../../../domain/entities/User';

export const registerUser = async (userData: Omit<User, 'id'>, userRepository: IUserRepository): Promise<User> => {
    // Validate user data (you can add more validation logic here)
    if (!userData.email || !userData.username || !userData.password) {
        throw new Error('All fields are required');
    }

    // Check if the user already exists
    const existingUser = await userRepository.findByEmail(userData.email);
    if (existingUser) {
        throw new Error('User already exists');
    }

    // Create a new user
    const newUser = new User({
        ...userData,
        id: generateUniqueId(), // Implement this function to generate a unique ID
    });

    // Save the user to the repository
    await userRepository.save(newUser);

    return newUser;
};