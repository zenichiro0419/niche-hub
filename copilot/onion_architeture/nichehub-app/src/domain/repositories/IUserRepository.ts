export interface IUserRepository {
    registerUser(email: string, username: string, password: string): Promise<void>;
    loginUser(email: string, password: string): Promise<string>; // Returns a JWT token
    getUserById(userId: string): Promise<User | null>;
    updateUser(userId: string, userData: Partial<User>): Promise<void>;
    deleteUser(userId: string): Promise<void>;
    getAllUsers(): Promise<User[]>;
}