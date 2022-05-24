import create from 'zustand';
import { devtools } from 'zustand/middleware';
import produce from 'immer';

const useStoreAuth = create(
  devtools((set) => ({
    userId: 'wodonggun@naver.com',
    setUserInfo: (value) =>
      set(
        produce((state) => {
          state.userId = value;
        })
      ),
  }))
);

export default useStoreAuth;
