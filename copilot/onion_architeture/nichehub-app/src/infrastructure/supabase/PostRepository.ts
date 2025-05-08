import { Post } from '../../domain/entities/Post';
import { IPostRepository } from '../../domain/repositories/IPostRepository';
import { supabase } from './client';

export class PostRepository implements IPostRepository {
    async createPost(post: Post): Promise<Post> {
        const { data, error } = await supabase
            .from('posts')
            .insert([post])
            .single();

        if (error) {
            throw new Error(error.message);
        }

        return data as Post;
    }

    async fetchPosts(communityId: string): Promise<Post[]> {
        const { data, error } = await supabase
            .from('posts')
            .select('*')
            .eq('community_id', communityId)
            .order('created_at', { ascending: false });

        if (error) {
            throw new Error(error.message);
        }

        return data as Post[];
    }

    async deletePost(postId: string): Promise<void> {
        const { error } = await supabase
            .from('posts')
            .delete()
            .eq('id', postId);

        if (error) {
            throw new Error(error.message);
        }
    }
}