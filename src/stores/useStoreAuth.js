import create from 'zustand';
import { devtools } from 'zustand/middleware';
import produce from 'immer';

const USER_ID = 'GUEST';
const USER_TOKEN = '';
const USER_MEMBERSHIP = '';
const USER_PROFILE = '';
const USER_PROFILE_IMAGE = '/static/images/avatar/2.jpg';

const useStoreAuth = create(
  devtools((set) => ({
    userId: USER_ID,
    userProfileImg: USER_PROFILE_IMAGE,
    userToken: USER_TOKEN,
    userMemberShip: USER_MEMBERSHIP,
    userProfile: USER_PROFILE,
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
    setInitialize: () =>
      set(
        produce((state) => {
          this.USER_ID = 'GUEST';
          this.USER_PROFILE_IMAGE = '/static/images/avatar/2.jpg';
          this.USER_TOKEN = '';
          this.USER_MEMBERSHIP = 'GUEST';
          this.USER_PROFILE = '';
        })
      ),
  }))
);

export default useStoreAuth;
