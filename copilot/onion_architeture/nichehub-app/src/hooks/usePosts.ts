import { useEffect, useState } from 'react';
import { Post } from '../domain/entities/Post';
import { fetchPosts } from '../application/usecases/post/fetchPosts';
import { PostService } from '../application/services/PostService';

const postService = new PostService();

const usePosts = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadPosts = async () => {
            try {
                setLoading(true);
                const fetchedPosts = await fetchPosts(postService);
                setPosts(fetchedPosts);
            } catch (err) {
                setError('Failed to load posts');
            } finally {
                setLoading(false);
            }
        };

        loadPosts();
    }, []);

    return { posts, loading, error };
};

export default usePosts;