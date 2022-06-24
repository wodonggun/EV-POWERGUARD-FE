import React, { useCallback, useRef, useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { AddCircleOutline } from '@mui/icons-material';
import StationDetail from './station_detail';
import StationWrite from './station_writing';
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
import { useConfirm } from 'material-ui-confirm';

const CustomToolbar = ({ setFilterButtonEl }) => (
  <GridToolbarContainer>
    <GridToolbarFilterButton ref={setFilterButtonEl} />
  </GridToolbarContainer>
);

const renderCreateBookmarkButton = (params) => {
  return (
    <strong>
      <Button
        variant="contained"
        color="primary"
        size="small"
        style={{ marginLeft: 16 }}
      >
        즐겨찾기 등록
      </Button>
    </strong>
  );
};

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
    field: 'stationName',
    headerName: '충전소명',
    type: 'string',
    width: 200,
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
  },
  {
    field: 'availableTime',
    headerName: '이용가능시간',
    type: 'string',
    width: 100,
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
  },
  {
    field: 'isFreeParking',
    headerName: '무료주차',
    type: 'string',
    width: 100,
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
  },
  {
    field: 'stationAddress',
    headerName: '위치',
    type: 'string',
    width: 300,
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
  },
  {
    field: 'repairCompanyName',
    headerName: '운영업체명',
    type: 'string',
    width: 200,
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
  },
  {
    field: 'id',
    headerName: '충전기',
    type: 'string',
    width: 130,
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
    renderCell: (params) => (
      <strong>
        <Button
          component={Link}
          to={'/charger/' + params.value}
          variant="contained"
          color="primary"
        >
          충전기 조회
        </Button>
      </strong>
    ),
  },
  {
    field: 'bookmark',
    headerName: '즐겨찾기 등록',
    type: 'number',
    width: 130,
    headerAlign: 'center',
    renderCell: renderCreateBookmarkButton,
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

function Station() {
  const {
    filterButtonEl,
    stationList,
    visible,
    page,
    setFilterButtonEl,
    setStationList,
    setVisible,
    setPage,
  } = useStoreStation((state) => state);
  const [date, setDate] = useState(new Date());
  const selectedRow = useRef({});
  const confirm = useConfirm();
  const handleClickContent = useCallback((params, event) => {
    if (params.field === 'bookmark') {
      selectedRow.current = params.row;
      console.log('station id 1 : ' + selectedRow.current.id);
      createBookmark(selectedRow.current.id);
    } else if (params.field !== 'id') {
      selectedRow.current = params.row;
      setVisible('detailStation', true);
    }
  }, []);
  const handleClickWriteStation = useCallback((params, event) => {
    setVisible('writingStation', true);
  });

  /**
   * 전체 리스트를 서버로 부터 받아 온다.
   */
  const getStationList = async () => {
    console.log('getStationList ====== 1');
    const res = await api.get('api/stations?size=' + page.size);
    console.log('getStationList ====== 2 1: ' + res);
    console.log('getStationList ====== 2 2: ' + res.status);
    if (res.status === 200 || res.status === 302) {
      console.log('getStationList ====== 3');
      setStationList(res.data);
    }
    console.log('getStationList ====== 4');
    return res;
  };

  const createBookmark = async (stationId) => {
    console.log('station id : ' + stationId);
    confirm({ description: `등록하시겠습니까?` })
      .then(() => {
        api.post(
          'api/stations/bookmarks',
          {
            stationId: stationId,
            userId: 'songTEST@gmail.com',
          },
          null,
          null
        );
      })
      .catch(() => console.log('Insert cancelled.'));
  };

  useEffect(() => {
    // component 가 랜더링 될 때 실행되는 함수
    console.log('useEffect ====== 1');
    getStationList();
    console.log('useEffect ====== 2');
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
        <h2>충전소 조회</h2>
      </div>
      <div style={{ alignSelf: 'self-end', paddingBottom: '10px' }}>
        <Button
          variant="outlined"
          startIcon={<AddCircleOutline />}
          onClick={handleClickWriteStation}
        >
          충전소 등록
        </Button>
      </div>
      <div style={{ height: 680, width: '100%' }}>
        <DataGrid
          rows={stationList}
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
      <StationDetail
        isShow={visible['detailStation']}
        data={selectedRow.current}
        setVisible={setVisible}
        reloadList={getStationList}
      />
      <StationWrite
        isShow={visible['writingStation']}
        setVisible={setVisible}
        reloadList={getStationList}
      />
    </Box>
  );
}

export default Station;
