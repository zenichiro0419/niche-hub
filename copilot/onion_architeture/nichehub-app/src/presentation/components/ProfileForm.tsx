import React, { useState } from 'react';

const ProfileForm: React.FC = () => {
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [profileImage, setProfileImage] = useState<File | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Profile updated:', { username, bio, profileImage });
    };

    return (
        <form onSubmit={handleSubmit} className="profile-form">
            <div>
                <label htmlFor="username">ユーザー名</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="bio">自己紹介</label>
                <textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="profileImage">プロフィール画像</label>
                <input
                    type="file"
                    id="profileImage"
                    accept="image/*"
                    onChange={(e) => {
                        if (e.target.files) {
                            setProfileImage(e.target.files[0]);
                        }
                    }}
                />
            </div>
            <button type="submit">更新</button>
        </form>
    );
};

export default ProfileForm;