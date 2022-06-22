import create from 'zustand';
import { devtools } from 'zustand/middleware';
import produce from 'immer';

const useStoreBreakdown = create(
  devtools((set) => ({
    filterButtonEl: null,
    breakdownList: [],
    visible: {
      detail: false,
      list: false,
      writing: false,
    },
    selectedReprot: {
      reportId: '',
      stationId: '',
      stationName: '',
      chargerId: '',
      reporterId: '',
      reporterName: '',
      reportedTime: '',
      completedTime: '',
    },
    selectedCharger: {
      stationId: '',
      stationName: '',
      chargerId: '',
    },
    setFilterButtonEl: (value) =>
      set(
        produce((state) => {
          state.filterButtonEl = value;
        })
      ),
    setBreakdownList: (value) =>
      set(
        produce((state) => {
          state.breakdownList = value;
        })
      ),
    setVisible: (type, value) =>
      set(
        produce((state) => {
          state.visible[type] = value;
        })
      ),
    setSelectedReport: (value) =>
      set(
        produce((state) => {
          state.selectedReport = value;
        })
      ),
    selectedCharger: (value) =>
      set(
        produce((state) => {
          state.selectedCharger = value;
        })
      ),
  }))
);

export default useStoreBreakdown;
