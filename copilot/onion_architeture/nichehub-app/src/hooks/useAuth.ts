import { useEffect, useState } from 'react';
import { AuthService } from '../application/services/AuthService';
import { User } from '../domain/entities/User';

const authService = new AuthService();

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const currentUser = await authService.getCurrentUser();
                setUser(currentUser);
            } catch (err) {
                setError('Failed to fetch user data');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const login = async (email: string, password: string) => {
        setLoading(true);
        try {
            const loggedInUser = await authService.login(email, password);
            setUser(loggedInUser);
        } catch (err) {
            setError('Login failed');
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        setLoading(true);
        try {
            await authService.logout();
            setUser(null);
        } catch (err) {
            setError('Logout failed');
        } finally {
            setLoading(false);
        }
    };

    return { user, loading, error, login, logout };
};