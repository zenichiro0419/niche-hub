import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../interface/store';
import { setCommunities, selectCommunity } from '../interface/communitySlice';

export const useCommunity = () => {
  const communities = useSelector((state: RootState) => state.community.communities);
  const selectedCommunityId = useSelector((state: RootState) => state.community.selectedCommunityId);
  const dispatch = useDispatch();
  return {
    communities,
    selectedCommunityId,
    setCommunities: (list: any[]) => dispatch(setCommunities(list)),
    selectCommunity: (id: string | null) => dispatch(selectCommunity(id)),
  };
};
