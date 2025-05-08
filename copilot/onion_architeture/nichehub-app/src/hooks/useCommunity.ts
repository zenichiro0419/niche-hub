import { useEffect, useState } from 'react';
import { Community } from '../domain/entities/Community';
import { CommunityService } from '../application/services/CommunityService';

const useCommunity = () => {
    const [communities, setCommunities] = useState<Community[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCommunities = async () => {
            try {
                setLoading(true);
                const fetchedCommunities = await CommunityService.fetchCommunities();
                setCommunities(fetchedCommunities);
            } catch (err) {
                setError('Failed to fetch communities');
            } finally {
                setLoading(false);
            }
        };

        fetchCommunities();
    }, []);

    return { communities, loading, error };
};

export default useCommunity;