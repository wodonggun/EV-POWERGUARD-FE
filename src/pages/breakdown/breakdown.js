import React, { useCallback, useRef, useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, Stack } from '@mui/material';

import RenderStatusChip from './components/statusChip';
import BreakdownDetail from './breakdown_detail';
import BreakdownWrite from './breakdown_writing';
// import StationList from './station_list';
// import BreakdownList from './breakdown_list';
import { useStoreBreakdown } from '../../stores';

import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarFilterButton,
} from '@mui/x-data-grid';
import {
  renderEditRating,
  renderRating,
} from '@mui/x-data-grid-generator/renderer';
import {
  LocalizationProvider,
  TimePicker,
  DatePicker,
} from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import api from '../../api';

const CustomToolbar = ({ setFilterButtonEl }) => (
  <GridToolbarContainer>
    <GridToolbarFilterButton ref={setFilterButtonEl} />
  </GridToolbarContainer>
);

const columns = [
  {
    field: 'id',
    headerName: 'ID',
    type: 'string',
  },
  {
    field: 'reportStatus',
    headerName: '처리 상태',
    type: 'string',
    width: 125,
    renderCell: RenderStatusChip,
  },
  {
    field: 'stationId',
    headerName: '충전소ID',
    type: 'string',
  },
  {
    field: 'stationName',
    headerName: '충전소명',
    width: 125,
    type: 'string',
  },
  {
    field: 'breakdownChargerId',
    headerName: '충전기ID',
    width: 125,
    type: 'string',
  },
  {
    field: 'location',
    headerName: '위치',
    type: 'string',
    width: 200,
  },
  {
    field: 'reportDescription',
    headerName: '설명',
    type: 'string',
    width: 200,
  },
  {
    field: 'reporterId',
    headerName: '작성자ID',
    type: 'string',
  },
  {
    field: 'reporterName',
    headerName: '작성자',
    type: 'string',
  },
  {
    field: 'reportedTime',
    headerName: '접수일자',
    type: 'date',
    valueGetter: ({ value }) => value && new Date(value),
  },
  {
    field: 'completedTime',
    headerName: '처리일자',
    type: 'date',
    valueGetter: ({ value }) => value && new Date(value),
  },
];

function Breakdown() {
  const {
    filterButtonEl,
    breakdownList,
    visible,
    selectedReport,
    selectedCharger,
    setFilterButtonEl,
    setBreakdownList,
    setVisible,
    setSelectedReport,
    setSelectedCharger,
  } = useStoreBreakdown((state) => state);

  const [date, setDate] = useState(new Date());
  const [readOnlyDetail, setReadOnlyDetail] = useState(true);
  const [lastRefreshDate, setLastRefreshDate] = useState(new Date());

  const selectedRow = useRef({
    id: '',
    stationId: '',
    stationName: '',
    breakdownChargerId: '',
    location: '',
    reportDescription: '',
    reporterId: '',
    reporterName: '',
    reportStatus: '',
    reportedTime: '',
    completedTime: '',
  });
  const handleClickContent = useCallback((params, event) => {
    if (params.field === 'reportStatus') {
      selectedRow.current = params.row;
      setReadOnlyDetail(true);
      setVisible('detail', true);
    }
  }, []);

  const handleClickWriteReport = useCallback((params, event) => {
    setVisible('writing', true);
  });
  const handleClickRefresh = useCallback((params, event) => {
    console.log('새로고침됨' + new Date());
    setLastRefreshDate(new Date());
    getBreakdownList();
  });

  /**
   * picker가 변경되면 핸들러에 변경된 date 값이 넘어 옵니다.
   * picker에 현재 설정된 값은 state date를 참조 하면 됩니다.
   */
  const handleChangeDate = useCallback((date) => {
    //
    setDate(date);
  });

  const handleSelectCharger = useCallback((visible, stationData) => {
    setSelectedCharger(stationData);
    setVisible('writing', visible);
  }, []);

  /**
   * 전체 리뷰 리스트를 서버로 부터 받아 온다.
   */
  const getBreakdownList = async () => {
    const res = await api.get('/api/reports');
    if (res.status === 200 || res.status === 302) {
      setBreakdownList(res.data);
    }

    return res;
  };

  useEffect(() => {
    // component 가 랜더링 될 때 실행되는 함수
    getBreakdownList();
  }, []);

  return (
    <Box
      sx={{
        m: 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        margin: '10px 40px',
        width: '100vm',
      }}
    >
      <div style={{ alignSelf: 'self-start', paddingLeft: '20px' }}>
        <h1>고장신고 조회</h1>
      </div>
      <Stack direction="row" justifyContent="flex-end" width="100%">
        <Box component="span" sx={{ p: 1 }}>
          마지막 새로고침 {lastRefreshDate.toLocaleString()}
        </Box>
        <Button
          variant="contained"
          startIcon={<RefreshOutlinedIcon />}
          onClick={handleClickRefresh}
        >
          새로고침
        </Button>
        <Button variant="outlined" onClick={handleClickWriteReport}>
          임시 고장신고 버튼
        </Button>
      </Stack>
      <div style={{ height: 675, width: '100%' }}>
        <DataGrid
          rows={breakdownList}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          // checkboxSelection
          disableSelectionOnClick
          components={{
            Toolbar: CustomToolbar,
          }}
          componentsProps={{
            panel: {
              anchorEl: filterButtonEl,
            },
            toolbar: {
              setFilterButtonEl,
            },
          }}
          initialState={{
            columns: {
              columnVisibilityModel: {
                id: false,
                stationId: false,
                reportDescription: false,
                reporterId: false,
                reporterName: true,
              },
            },
          }}
          onCellClick={handleClickContent}
        />
      </div>
      <BreakdownDetail
        isShow={visible['detail']}
        data={selectedRow.current}
        setVisible={setVisible}
        readOnlyDetail={readOnlyDetail}
      />
      {/* <StationList
        isShow={visible['list']}
        setVisible={setVisible}
        onClickOk={handleSelectCharger}
      /> */}
      <BreakdownWrite
        isShow={visible['writing']}
        data={selectedCharger}
        setVisible={setVisible}
      />
    </Box>
  );
}

export default Breakdown;
