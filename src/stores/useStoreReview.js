import create from 'zustand';
import { devtools } from 'zustand/middleware';
import produce from 'immer';

const useStoreReview = create(
  devtools((set) => ({
    filterButtonEl: null,
    reviewList: [],
    visible: {
      detail: false,
      list: false,
      writing: false,
    },
    selectedStation: {
      stationName: '',
      content: '',
      rating: 5,
      userName: '',
      registDate: '',
    },
    setFilterButtonEl: (value) =>
      set(
        produce((state) => {
          state.filterButtonEl = value;
        })
      ),
    setReviewList: (value) =>
      set(
        produce((state) => {
          state.reviewList = value;
        })
      ),
    setVisible: (type, value) =>
      set(
        produce((state) => {
          state.visible[type] = value;
        })
      ),
    setSelectedStation: (value) =>
      set(
        produce((state) => {
          state.selectedStation = value;
        })
      ),
  }))
);

export default useStoreReview;
