export interface Community {
    id: string;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    members: string[]; // Array of user IDs
}

export interface CommunityCreateInput {
    name: string;
    description: string;
}

export interface CommunityUpdateInput {
    name?: string;
    description?: string;
}