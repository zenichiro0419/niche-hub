import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import CommunitySelector from '../components/CommunitySelector';
import PostCard from '../components/PostCard';
import { Community } from '../../domain/entities/Community';

const CommunityPage: React.FC = () => {
    const selectedCommunity: Community | null = useSelector((state: RootState) => state.community.selectedCommunity);
    const posts = useSelector((state: RootState) => state.post.posts.filter(post => post.communityId === selectedCommunity?.id));

    return (
        <div className="community-page">
            <h1>{selectedCommunity ? selectedCommunity.name : 'Select a Community'}</h1>
            <CommunitySelector />
            <div className="posts">
                {posts.length > 0 ? (
                    posts.map(post => <PostCard key={post.id} post={post} />)
                ) : (
                    <p>No posts available in this community.</p>
                )}
            </div>
        </div>
    );
};

export default CommunityPage;