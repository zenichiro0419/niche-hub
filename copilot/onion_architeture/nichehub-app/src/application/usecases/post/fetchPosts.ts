import { Post } from '../../../domain/entities/Post';
import { IPostRepository } from '../../../domain/repositories/IPostRepository';

export const fetchPosts = async (postRepository: IPostRepository): Promise<Post[]> => {
    try {
        const posts = await postRepository.getAllPosts();
        return posts;
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw new Error('Could not fetch posts');
    }
};