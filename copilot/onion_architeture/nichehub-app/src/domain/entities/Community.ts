export class Community {
    constructor(
        public id: string,
        public name: string,
        public description: string,
        public createdAt: Date,
        public members: string[] = []
    ) {}

    addMember(userId: string) {
        if (!this.members.includes(userId)) {
            this.members.push(userId);
        }
    }

    removeMember(userId: string) {
        this.members = this.members.filter(member => member !== userId);
    }
}