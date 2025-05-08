import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../application/usecases/user/registerUser';
import { setUser } from '../../store/userSlice';
import ProfileForm from '../components/ProfileForm';

const Register: React.FC = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const user = await registerUser({ email, username, password });
            dispatch(setUser(user));
            // Redirect or show success message
        } catch (err) {
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <div className="register-page">
            <h2>Register</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleRegister}>
                <ProfileForm
                    email={email}
                    setEmail={setEmail}
                    username={username}
                    setUsername={setUsername}
                    password={password}
                    setPassword={setPassword}
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;