export interface ICommunityRepository {
    getAllCommunities(): Promise<Community[]>;
    getCommunityById(id: string): Promise<Community | null>;
    createCommunity(community: Community): Promise<Community>;
    updateCommunity(community: Community): Promise<Community>;
    deleteCommunity(id: string): Promise<void>;
}