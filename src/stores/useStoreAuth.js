import create from 'zustand';
import { devtools } from 'zustand/middleware';
import produce from 'immer';

const useStoreAuth = create(
  devtools((set) => ({
    userId: 'GUEST',
    userProfileImg: '/static/images/avatar/2.jpg',
    userToken: '',
    userMemberShip: 'GUEST',
    userProfile: '',
    setUserId: (value) =>
      set(
        produce((state) => {
          state.userId = value;
        })
      ),
    setUserProfileImg: (value) =>
      set(
        produce((state) => {
          state.userProfileImg = value;
        })
      ),
    setUserToken: (value) =>
      set(
        produce((state) => {
          state.userToken = value;
        })
      ),
    setUserMemberShip: (value) =>
      set(
        produce((state) => {
          state.userMemberShip = value;
        })
      ),
    setUserProfile: (value1, value2, value3) =>
      set(
        produce((state) => {
          state.userId = value1;
          state.userProfileImg = value2;
          state.userToken = value3;
        })
      ),
  }))
);

export default useStoreAuth;
