import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Community } from '../../domain/entities/Community';

const CommunitySelector: React.FC<{ onSelect: (community: Community) => void }> = ({ onSelect }) => {
    const communities = useSelector((state: RootState) => state.community.communities);

    return (
        <div className="community-selector">
            <h3>Select a Community</h3>
            <ul>
                {communities.map((community) => (
                    <li key={community.id} onClick={() => onSelect(community)}>
                        {community.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CommunitySelector;