import create from 'zustand';
import { devtools } from 'zustand/middleware';
import produce from 'immer';

const useStoreStation = create(
  devtools((set) => ({
    filterButtonEl: null,
    stationList: [],
    chargerList: [],
    page: {
      size: 1000,
      page: 1,
      sort: '',
    },
    visible: {
      detailStation: false,
      listStation: false,
      writingStation: false,
      detailCharger: false,
      listCharger: false,
      writingCharger: false,
    },
    selectedStation: {
      stationName: '',
    },
    selectedCharger: {
      chargerName: '',
    },
    setFilterButtonEl: (value) =>
      set(
        produce((state) => {
          state.filterButtonEl = value;
        })
      ),
    setStationList: (value) =>
      set(
        produce((state) => {
          state.stationList = value;
        })
      ),
    setChargerList: (value) =>
      set(
        produce((state) => {
          state.chargerList = value;
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
    setSelectedCharger: (value) =>
      set(
        produce((state) => {
          state.selectedCharger = value;
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

export default useStoreStation;
