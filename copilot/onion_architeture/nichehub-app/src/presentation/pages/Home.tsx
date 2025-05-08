import React from 'react';
import { usePosts } from '../../hooks/usePosts';
import PostCard from '../components/PostCard';
import CommunitySelector from '../components/CommunitySelector';
import NotificationList from '../components/NotificationList';

const Home: React.FC = () => {
    const { posts, loading, error } = usePosts();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading posts: {error.message}</div>;
    }

    return (
        <div className="home-container">
            <CommunitySelector />
            <NotificationList />
            <div className="post-feed">
                {posts.map(post => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
};

export default Home;