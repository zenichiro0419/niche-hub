import { Post } from '../../../domain/entities/Post';
import { IPostRepository } from '../../../domain/repositories/IPostRepository';

interface CreatePostInput {
    title: string;
    content: string;
    communityId: string;
    userId: string;
}

export const createPost = async (
    input: CreatePostInput,
    postRepository: IPostRepository
): Promise<Post> => {
    const { title, content, communityId, userId } = input;

    // Create a new post entity
    const newPost = new Post({
        title,
        content,
        communityId,
        userId,
        createdAt: new Date(),
    });

    // Save the post using the repository
    const savedPost = await postRepository.save(newPost);

    return savedPost;
};