export interface IPostRepository {
    createPost(post: Post): Promise<Post>;
    fetchPosts(communityId: string): Promise<Post[]>;
    updatePost(postId: string, updatedPost: Partial<Post>): Promise<Post>;
    deletePost(postId: string): Promise<void>;
    fetchPostById(postId: string): Promise<Post | null>;
}