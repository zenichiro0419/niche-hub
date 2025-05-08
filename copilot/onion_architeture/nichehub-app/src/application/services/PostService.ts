import { Post } from '../../domain/entities/Post';
import { IPostRepository } from '../../domain/repositories/IPostRepository';

export class PostService {
    private postRepository: IPostRepository;

    constructor(postRepository: IPostRepository) {
        this.postRepository = postRepository;
    }

    async createPost(postData: Omit<Post, 'id' | 'createdAt'>): Promise<Post> {
        const newPost = { ...postData, createdAt: new Date().toISOString() };
        return await this.postRepository.create(newPost);
    }

    async fetchPosts(communityId: string): Promise<Post[]> {
        return await this.postRepository.findByCommunityId(communityId);
    }

    async likePost(postId: string): Promise<Post> {
        return await this.postRepository.like(postId);
    }

    async deletePost(postId: string): Promise<void> {
        return await this.postRepository.delete(postId);
    }
}