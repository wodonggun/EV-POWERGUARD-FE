import React, { useCallback, useRef, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import DriverLogDetail from './driverlog_detail';
import StationList from './station_list';
import DriverLogWrite from './driverlog_writing';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarFilterButton,
} from '@mui/x-data-grid';
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
    headerName: '순서',
    type: 'string',
    width: 50,
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
    renderCell: (params) => <span>{params.id}</span>,
  },
  {
    field: 'chargeDate',
    headerName: '이용일자',
    width: 110,
    type: 'date',
    headerAlign: 'center',
    valueGetter: ({ value }) => value && new Date(value),
  },
  {
    field: 'stationName',
    headerName: '이용 충전소명',
    type: 'string',
    width: 150,
    headerAlign: 'center',
  },
  {
    field: 'chargerType',
    headerName: '충전기 타입',
    type: 'string',
    headerAlign: 'center',
  },
  {
    field: 'chargeAmount',
    headerName: '충전 전력량(kWh)',
    type: 'number',
    width: 130,
    headerAlign: 'center',
  },
  {
    field: 'chargeFee',
    headerName: '충전요금(원)',
    type: 'number',
    headerAlign: 'center',
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
    width: 130,
    headerAlign: 'center',
  },
  {
    field: 'memo',
    headerName: '메모',
    type: 'string',
    width: 350,
    headerAlign: 'center',
  },
  {
    field: 'electronicEfficiency',
    headerName: '전비(km/kWh)',
    type: 'number',
    width: 110,
    headerAlign: 'center',
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

  const selectedRow = useRef({
    id: '',
    loginId: '',
  });

  let sessionStorage = window.sessionStorage;
  //sessionStorage.setItem('id', 'TEST@naver.com');
  let sessionLoginId = sessionStorage.getItem('id');

  const handleClickCalEfficiency = useCallback((params, event) => {
    if (params.field === 'electronicEfficiency') {
      setVisible('writing', true);
    }else {
      selectedRow.current = params.row;      
      setVisible('detail', true);
      
    }
  }, []);
  const handleClickWriteDriverLog = useCallback((params, event) => {
    setVisible('list', true);
  });
  // const handleClickGetMyDriverLog = useCallback((params, event) => {
  //   const res = api.get('api/driverlogs', { id: 'id' });
  //   //const res = api.get('/driverlogs', { reviewerId: 'user01' });
  //   if (res.status === 200 || res.status === 302) {
  //     setDriverLogList();
  //   }
  // }, []);

  const handleSelectStation = useCallback((visible, stationData) => {
    setSelectedStation(stationData);
    setVisible('writing', visible);
  }, []);

  /**
   * 전체 차계부 목록을 서버에서 조회해 온다.
   */
  const getDriverLogList = async () => {
    console.log("****************" , sessionLoginId);

    const res = await api.get('/api/driverlogs/loginId/' + sessionLoginId);
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
        width: '100%',
      }}
    >
      <div style={{ alignSelf: 'self-start' }}>
        <h2>차계부 목록조회</h2>
      </div>
      <div style={{ alignSelf: 'self-start', paddingBottom: '10px' }}>
        <Button onClick={handleClickWriteDriverLog}>차계부 쓰기</Button>
      </div>
      <div style={{ height: 500, width: '100%' }}>
      <div style={{ display: 'flex', height: '100%' }}>
        <div style={{ flexGrow: 1 }}>
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
          onCellClick={handleClickCalEfficiency}
        />
      </div></div></div>
      <DriverLogDetail
        isShow={visible['detail']}
        data={selectedRow.current}
        setVisible={setVisible}
        reloadList={getDriverLogList}
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
        reloadList={getDriverLogList}
      />
    </Box>
  );
}

export default DriverLog;
