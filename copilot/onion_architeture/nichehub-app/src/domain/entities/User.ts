export class User {
    constructor(
        public id: string,
        public username: string,
        public email: string,
        public password: string,
        public profileImage?: string,
        public communities: string[] = []
    ) {}

    // Method to update the user's profile
    updateProfile(username: string, profileImage?: string) {
        this.username = username;
        if (profileImage) {
            this.profileImage = profileImage;
        }
    }

    // Method to add a community to the user's list
    joinCommunity(communityId: string) {
        if (!this.communities.includes(communityId)) {
            this.communities.push(communityId);
        }
    }

    // Method to leave a community
    leaveCommunity(communityId: string) {
        this.communities = this.communities.filter(id => id !== communityId);
    }
}