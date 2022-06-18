import React, { useCallback, useRef, useState, useEffect } from 'react';
import { Box, Button, TextField } from '@mui/material';
import DriverLogDetail from './driverlog_detail';
import StationList from './station_list';
import DriverLogWrite from './driverlog_writing';
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
import { useStoreDriverLog } from '../../stores';
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
  // {
  //   field: 'chargeDate',
  //   headerName: '이용일자',
  //   type: 'date',
  // },
  {
    field: 'stationName',
    headerName: '이용 충전소명',
    type: 'string',
  },
  {
    field: 'chargerType',
    headerName: '충전기 타입',
    type: 'string',
  },
  {
    field: 'chargeAmount',
    headerName: '충전 전력양(kWh)',
    type: 'number',
  },
  {
    field: 'chargeFee',
    headerName: '충전요금(원)',
    type: 'number',
  },
  // {
  //   field: 'starPoint',
  //   headerName: '별점',
  //   renderCell: renderRating,
  //   renderEditCell: renderEditRating,
  //   type: 'number',
  //   width: 200,
  // },
  {
    field: 'nowMileage',
    headerName: '현재 키로수(km)',
    type: 'number',
  },
  {
    field: 'memo',
    headerName: '메모',
    width: 280,
    type: 'string',
  },
  {
    field: 'electronicEfficiency',
    headerName: '전비(km/kWh)',
    type: 'number',
    renderCell: (params) => (
      <Button variant="contained" size="small">
        전비계산
      </Button>
    ),
  },
  // {
  //   field: 'registDate',
  //   headerName: '작성일',
  //   type: 'date',
  //   valueGetter: ({ value }) => value && new Date(value),
  // },
];

function DriverLog() {
  const {
    filterButtonEl,
    driverLogList,
    visible,
    selectedStation,
    setFilterButtonEl,
    setDriverLogList,
    setVisible,
    setSelectedStation,
  } = useStoreDriverLog((state) => state);
  const [date, setDate] = useState(new Date());
  const selectedRow = useRef({
    id: '',
    loginId: '',
  });
  const handleClickContent = useCallback((params, event) => {
    if (params.field === 'electronicEfficiency') {
      console.log('안녕');
      setVisible('writing', true);
    }else {
      selectedRow.current = params.row;
      setVisible('detail', true);
      console.log('컨텐츠');
    }
  }, []);
  const handleClickWriteDriverLog = useCallback((params, event) => {
    setVisible('list', true);
  });
  const handleClickGetMyDriverLog = useCallback((params, event) => {
    const res = api.get('api/driverlogs', { id: 'id' });
    //const res = api.get('/driverlogs', { reviewerId: 'user01' });
    if (res.status === 200 || res.status === 302) {
      setDriverLogList();
    }
  });
  /**
   * picker가 변경되면 핸들러에 변경된 date 값이 넘어 옵니다.
   * picker에 현재 설정된 값은 state date를 참조 하면 됩니다.
   */
  const handleChangeDate = useCallback((date) => {
    //
    setDate(date);
  });

  const handleSelectStation = useCallback((visible, stationData) => {
    setSelectedStation(stationData);
    setVisible('writing', visible);
  }, []);

  /**
   * 전체 리뷰 리스트를 서버로 부터 받아 온다.
   */
  const getDriverLogList = async () => {
    const res = await api.get('/api/driverlogs');
    if (res.status === 200 || res.status === 302) {
      setDriverLogList(res.data);
    }

    return res;
  };

  useEffect(() => {
    // component 가 랜더링 될 때 실행되는 함수

    getDriverLogList();
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
        <h2>차계부 목록조회</h2>
        <Button onClick={handleClickWriteDriverLog}>새 차계부 작성</Button>
        <Button onClick={handleClickGetMyDriverLog}>전비계산</Button>

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="date picker example"
            value={date}
            onChange={handleChangeDate}
            renderInput={(params) => <TextField {...params} />}
          />
          <TimePicker
            renderInput={(props) => <TextField {...props} />}
            label="time picker example"
            value={date}
            onChange={handleChangeDate}
          />
        </LocalizationProvider>
      </div>
      <div style={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={driverLogList}
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
          onCellClick={handleClickContent}
        />
      </div>
      <DriverLogDetail
        isShow={visible['detail']}
        data={selectedRow.current}
        setVisible={setVisible}
      />
      <StationList
        isShow={visible['list']}
        setVisible={setVisible}
        onClickOk={handleSelectStation}
      />
      <DriverLogWrite
        isShow={visible['writing']}
        data={selectedStation}
        setVisible={setVisible}
      />
    </Box>
  );
}

export default DriverLog;
