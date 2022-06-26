import React, { useCallback, useRef, useState, useEffect } from 'react';
import { Box, Button, Chip } from '@mui/material';
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

import api from '../../api';
import { useStoreBookmark } from '../../stores';
import { useConfirm } from 'material-ui-confirm';
import WatchLaterIcon from '@mui/icons-material/WatchLater';

const CustomToolbar = ({ setFilterButtonEl }) => (
  <GridToolbarContainer>
    <GridToolbarFilterButton ref={setFilterButtonEl} />
  </GridToolbarContainer>
);

const renderDeleteButton = (params) => {
  return (
    <strong>
      <Button
        variant="contained"
        color="primary"
        size="small"
        style={{ marginLeft: 16 }}
      >
        삭제
      </Button>
    </strong>
  );
};

const columns = [
  {
    field: 'stationName',
    headerName: '충전소명',
    type: 'string',
    width: 200,
    headerAlign: 'center',
  },
  {
    field: 'stationAddress',
    headerName: '충전소위치',
    type: 'string',
    width: 200,
    headerAlign: 'center',
  },
  {
    field: 'isFreeParking',
    headerName: '무료주차여부',
    type: 'boolean',
    width: 100,
    headerAlign: 'center',
  },
  {
    field: 'availableTime',
    headerName: '이용가능시간',
    type: 'string',
    width: 100,
    headerAlign: 'center',
    renderCell: (params) => (
      <strong>
        <Chip
          icon={<WatchLaterIcon />}
          label={params.row.availableTime}
          variant="outlined"
          color="default"
        />
      </strong>
    ),
  },
  {
    field: 'countAvailableChargerFast',
    headerName: '사용가능충전기(급속)',
    type: 'string',
    width: 180,
    headerAlign: 'center',
  },
  {
    field: 'countAvailableChargerNormal',
    headerName: '사용가능충전기(완속)',
    type: 'string',
    width: 180,
    headerAlign: 'center',
  },
  {
    field: 'countBrokenCharger',
    headerName: '고장충전기',
    type: 'string',
    width: 100,
    headerAlign: 'center',
  },
  {
    field: 'id',
    headerName: '즐겨찾기 삭제',
    type: 'number',
    width: 150,
    headerAlign: 'center',
    renderCell: renderDeleteButton,
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

function Bookmark() {
  const { bookmarkList, visible, page, setBookmarkList, setVisible, setPage } =
    useStoreBookmark((state) => state);

  const selectedRow = useRef({
    id: '',
  });

  const confirm = useConfirm();

  const handleClickDeleteBookmark = useCallback((params, event) => {
    if (params.field === 'id') {
      selectedRow.current = params.row;
      console.log('클릭' + selectedRow.current.id);
      deleteBookmark();
    }
  }, []);

  /**
   * 사용자별 즐겨찾기 리스트 조회
   */
  const getBookmarkList = async () => {
    console.log(
      'process.env.REACT_APP_BASE_URL : ' + process.env.REACT_APP_BASE_URL
    );
    const res = await api.get(
      'api/stations/bookmarks/userid/' +
        'songTEST@gmail.com' +
        '?size=' +
        page.size
    );
    if (res.status === 200 || res.status === 302) {
      setBookmarkList(res.data);
    }

    return res;
  };

  /**
   * 사용자별 즐겨찾기 리스트 삭제
   */
  const deleteBookmark = async () => {
    console.log('즐겨찾기 삭제' + selectedRow.current.id);
    console.log('즐겨찾기 삭제' + selectedRow.current.userId);

    confirm({ description: `즐겨찾기 충전소를 삭제하시겠습니까?` })
      .then(() => {
        api.delete(
          'api/stations/bookmarks/' + selectedRow.current.id,
          null,
          handleRefReload
        );
      })
      .catch(() => console.log('Delete cancelled.'));

    return;
  };

  const handleRefReload = (event) => {
    setVisible('bookmarkList', false);
    getBookmarkList();
  };

  useEffect(() => {
    // component 가 랜더링 될 때 실행되는 함수
    getBookmarkList();
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
        <h2>즐겨찾기 조회</h2>
      </div>
      <div style={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={bookmarkList}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          disableSelectionOnClick
          components={{
            Toolbar: CustomToolbar,
            Pagination: CustomPagination,
          }}
          onCellClick={handleClickDeleteBookmark}
        />
      </div>
    </Box>
  );
}

export default Bookmark;
