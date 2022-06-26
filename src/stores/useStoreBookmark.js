import create from 'zustand';
import { devtools } from 'zustand/middleware';
import produce from 'immer';

const useStoreBookmark = create(
  devtools((set) => ({
    bookmarkList: [],
    visible: {
      bookmarkList: false,
    },
    setBookmarkList: (value) =>
      set(
        produce((state) => {
          state.bookmarkList = value;
        })
      ),
    setVisible: (type, value) =>
      set(
        produce((state) => {
          state.visible[type] = value;
        })
      ),
    setPage: (value) =>
      set(
        produce((state) => {
          state.page = value;
        })
      ),
  }))
);

export default useStoreBookmark;
