import { supabase } from '../client';
import { ICommunityRepository } from '../../domain/repositories/ICommunityRepository';
import { Community } from '../../domain/entities/Community';

export class CommunityRepository implements ICommunityRepository {
    async getAllCommunities(): Promise<Community[]> {
        const { data, error } = await supabase
            .from('communities')
            .select('*');

        if (error) {
            throw new Error(error.message);
        }

        return data as Community[];
    }

    async getCommunityById(id: string): Promise<Community | null> {
        const { data, error } = await supabase
            .from('communities')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            throw new Error(error.message);
        }

        return data as Community;
    }

    async createCommunity(community: Community): Promise<Community> {
        const { data, error } = await supabase
            .from('communities')
            .insert([community]);

        if (error) {
            throw new Error(error.message);
        }

        return data[0] as Community;
    }

    async updateCommunity(id: string, community: Partial<Community>): Promise<Community | null> {
        const { data, error } = await supabase
            .from('communities')
            .update(community)
            .eq('id', id);

        if (error) {
            throw new Error(error.message);
        }

        return data[0] as Community;
    }

    async deleteCommunity(id: string): Promise<void> {
        const { error } = await supabase
            .from('communities')
            .delete()
            .eq('id', id);

        if (error) {
            throw new Error(error.message);
        }
    }
}