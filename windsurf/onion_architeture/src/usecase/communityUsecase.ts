// ユースケース層: コミュニティ関連
import { Community } from '@domain/community';

const dummyCommunities: Community[] = [
  { id: '1', name: 'プログラミング', description: 'コードが好きな人の集まり', iconUrl: '' },
  { id: '2', name: '写真', description: '写真好きのコミュニティ', iconUrl: '' },
  { id: '3', name: 'ガーデニング', description: '園芸愛好家のための場所', iconUrl: '' }
];

export const getCommunities = (): Community[] => dummyCommunities;
export const getCommunity = (id: string): Community | undefined => dummyCommunities.find(c => c.id === id);
