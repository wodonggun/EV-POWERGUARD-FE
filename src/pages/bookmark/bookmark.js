import React, { useCallback, useRef, useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarFilterButton,
} from '@mui/x-data-grid';

import api from '../../api';
import { useStoreBookmark } from '../../stores';

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
  },
  {
    field: 'stationAddress',
    headerName: '충전소위치',
    type: 'string',
  },
  {
    field: 'isFreeParking',
    headerName: '무료주차여부',
    type: 'boolean',
  },
  {
    field: 'availableTime',
    headerName: '이용가능시간',
    type: 'string',
  },
  {
    field: 'countAvailableChargerFast',
    headerName: '사용가능충전기(급속)',
    type: 'string',
  },
  {
    field: 'countAvailableChargerNormal',
    headerName: '사용가능충전기(완속)',
    type: 'string',
  },
  {
    field: 'countBrokenCharger',
    headerName: '고장충전기',
    type: 'string',
  },
  {
    field: 'id',
    headerName: '즐겨찾기 삭제',
    type: 'number',
    renderCell: renderDeleteButton,
  },
];

function Bookmark() {
  const { bookmarkList, setBookmarkList } = useStoreBookmark((state) => state);

  const selectedRow = useRef({
    id: '',
  });

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
      'api/stations/bookmarks/userid/' + 'songTEST@gmail.com'
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
    const res = await api.delete(
      'api/stations/bookmarks/' + selectedRow.current.id,
      null,
      handleRefReload
    );

    if (res.status === 200 || res.status === 302) {
      getBookmarkList();
    } else {
      console.log('미등록 즐겨찾기 입니다.');
    }

    return;
  };

  const handleRefReload = (event) => {
    //setVisible('bookmarkList', false);
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
          }}
          onCellClick={handleClickDeleteBookmark}
        />
      </div>
    </Box>
  );
}

export default Bookmark;
