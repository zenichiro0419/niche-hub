export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
    return password.length >= 6; // Minimum length of 6 characters
};

export const validateUsername = (username: string): boolean => {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/; // Alphanumeric and underscores, 3 to 20 characters
    return usernameRegex.test(username);
};

export const validatePostContent = (content: string): boolean => {
    return content.length > 0 && content.length <= 280; // Content must be between 1 and 280 characters
};

export const validateCommunityName = (name: string): boolean => {
    return name.length > 0 && name.length <= 50; // Community name must be between 1 and 50 characters
};