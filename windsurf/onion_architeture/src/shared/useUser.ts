import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../interface/store';
import { setUserName, logout } from '../interface/userSlice';

export const useUser = () => {
  const userName = useSelector((state: RootState) => state.user.userName);
  const dispatch = useDispatch();
  return {
    userName,
    setUserName: (name: string | null) => dispatch(setUserName(name)),
    logout: () => dispatch(logout()),
  };
};
