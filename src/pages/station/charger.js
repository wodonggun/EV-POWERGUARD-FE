import React, { useCallback, useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Box, Button, Grid, Stack, TextField } from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material';
import Icon from '@mui/material/Icon';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ChargerDetail from './charger_detail';
import ChargerWrite from './charger_writing';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarFilterButton,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from '@mui/x-data-grid';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import PropTypes from 'prop-types';
import api from '../../api';
import { useStoreStation } from '../../stores';
const CustomToolbar = ({ setFilterButtonEl }) => (
  <GridToolbarContainer>
    <GridToolbarFilterButton ref={setFilterButtonEl} />
  </GridToolbarContainer>
);

const columns = [
  {
    field: 'idx',
    headerName: '순서',
    type: 'string',
    width: 100,
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
    renderCell: (params) => (
      <span>{params.api.getRowIndex(params.row.id) + 1}</span>
    ),
  },
  {
    field: 'chargerName',
    headerName: '충전기명',
    type: 'string',
    width: 150,
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
  },
  {
    field: 'serialNumber',
    headerName: '시리얼번호',
    type: 'string',
    width: 150,
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
  },
  {
    field: 'operationStatus',
    headerName: '충전기상태',
    type: 'string',
    width: 100,
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
  },
  {
    field: 'chargerType',
    headerName: '충전기종류',
    type: 'string',
    width: 100,
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
  },
  {
    field: 'connectorType',
    headerName: '커넥터',
    type: 'string',
    width: 200,
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
  },
  {
    field: 'inputVoltage',
    headerName: '입력전압',
    type: 'string',
    width: 100,
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
  },
  {
    field: 'outputVoltage',
    headerName: '출력전압',
    type: 'string',
    width: 100,
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
  },
  {
    field: 'ratedCapacity',
    headerName: '정격용량',
    type: 'string',
    width: 100,
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
  },
  {
    field: 'chargingTime',
    headerName: '충전시간',
    type: 'string',
    width: 100,
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
  },
  {
    field: 'chargingStationId',
    headerName: 'StationId',
    type: 'string',
    width: 100,
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
  },
];

function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      color="primary"
      variant="outlined"
      shape="rounded"
      page={page + 1}
      count={pageCount}
      // @ts-expect-error
      renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}

function Charger() {
  const {
    filterButtonEl,
    chargerList,
    selectedStation,
    visible,
    page,
    setFilterButtonEl,
    setChargerList,
    setSelectedStation,
    setVisible,
    setPage,
  } = useStoreStation((state) => state);
  const [date, setDate] = useState(new Date());
  const { stationId } = useParams();
  const selectedRow = useRef({});
  const handleClickContent = useCallback((params, event) => {
    //if (params.field === 'chargerName') {
    selectedRow.current = params.row;
    setVisible('detailCharger', true);
    //}
  }, []);
  const handleClickWriteCharger = useCallback((params, event) => {
    setVisible('writingCharger', true);
  });

  /**
   * 전체 리스트를 서버로 부터 받아 온다.
   */
  const getChargerList = async () => {
    const res = await api.get(
      'api/stations/' + stationId + '/chargers?size=' + page.size
    );
    if (res.status === 200 || res.status === 302) {
      setChargerList(res.data);
    }

    return res;
  };

  const getStationDetail = async () => {
    const res = await api.get('api/stations/' + stationId);
    if (res.status === 200 || res.status === 302) {
      setSelectedStation(res.data);
    }

    return res;
  };

  useEffect(() => {
    // component 가 랜더링 될 때 실행되는 함수
    getStationDetail();
    getChargerList();
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
        '& .super-app-theme--header': {
          backgroundColor: 'rgba(0, 0, 0, 0)',
        },
      }}
    >
      <div style={{ alignSelf: 'self-start', paddingLeft: '20px' }}>
        <h2>
          <Button
            component={Link}
            to="/station"
            variant="outlined"
            color="primary"
          >
            <Icon>arrow_back</Icon>
            이전
          </Button>
          <span style={{ alignSelf: 'self-start', paddingLeft: '20px' }}>
            ({selectedStation.stationName}) 충전기 조회
          </span>
        </h2>
      </div>
      <div style={{ alignSelf: 'self-end', paddingBottom: '10px' }}>
        <Button
          variant="outlined"
          startIcon={<AddCircleOutline />}
          onClick={handleClickWriteCharger}
        >
          충전기 등록
        </Button>
      </div>
      <div style={{ height: 680, width: '100%' }}>
        <DataGrid
          rows={chargerList}
          rowHeight={50}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          //checkboxSelection
          disableSelectionOnClick
          components={{
            Toolbar: CustomToolbar,
            Pagination: CustomPagination,
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
      <ChargerDetail
        isShow={visible['detailCharger']}
        data={selectedRow.current}
        setVisible={setVisible}
        reloadList={getChargerList}
      />
      <ChargerWrite
        isShow={visible['writingCharger']}
        data={selectedStation}
        setVisible={setVisible}
        reloadList={getChargerList}
      />
    </Box>
  );
}

export default Charger;
