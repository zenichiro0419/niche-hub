export interface User {
    id: string;
    username: string;
    email: string;
    password: string; // Consider hashing this in production
    profileImage?: string;
    communities: string[]; // Array of community IDs the user belongs to
    createdAt: Date;
    updatedAt: Date;
}

export interface UserProfile {
    username: string;
    email: string;
    profileImage?: string;
    bio?: string; // Optional field for user bio
}

export interface UserRegistration {
    username: string;
    email: string;
    password: string;
}

export interface UserLogin {
    email: string;
    password: string;
}