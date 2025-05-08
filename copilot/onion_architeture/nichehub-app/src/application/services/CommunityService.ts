import { Community } from '../../domain/entities/Community';
import { ICommunityRepository } from '../../domain/repositories/ICommunityRepository';

export class CommunityService {
    private communityRepository: ICommunityRepository;

    constructor(communityRepository: ICommunityRepository) {
        this.communityRepository = communityRepository;
    }

    async createCommunity(name: string, description: string): Promise<Community> {
        const newCommunity = new Community(name, description);
        return await this.communityRepository.create(newCommunity);
    }

    async fetchCommunities(): Promise<Community[]> {
        return await this.communityRepository.getAll();
    }

    async getCommunityById(id: string): Promise<Community | null> {
        return await this.communityRepository.getById(id);
    }

    async updateCommunity(id: string, name: string, description: string): Promise<Community | null> {
        const updatedCommunity = new Community(name, description);
        return await this.communityRepository.update(id, updatedCommunity);
    }

    async deleteCommunity(id: string): Promise<void> {
        await this.communityRepository.delete(id);
    }
}