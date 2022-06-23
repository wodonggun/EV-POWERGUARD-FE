import create from 'zustand';
import { devtools } from 'zustand/middleware';
import produce from 'immer';

const useStoreBookmark = create(
  devtools((set) => ({
    bookmarkList: [],
    visible: {
      detail: false,
      list: false,
      writing: false,
    },
    setBookmarkList: (value) =>
      set(
        produce((state) => {
          state.bookmarkList = value;
        })
      ),
  }))
);

export default useStoreBookmark;
