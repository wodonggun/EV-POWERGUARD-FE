import React, { useCallback, useRef, useState, useEffect } from 'react';
import { Box, Button, TextField } from '@mui/material';
import ReviewDetail from './review_detail';
import StationList from './station_list';
import ReviewWrite from './review_writing';
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
import { useStoreReview } from '../../stores';
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
    field: 'stationName',
    headerName: '충전소명',
    type: 'string',
  },
  {
    field: 'contents',
    headerName: '내용',
    type: 'string',
    width: 200,
  },
  {
    field: 'starPoint',
    headerName: '별점',
    renderCell: renderRating,
    renderEditCell: renderEditRating,
    type: 'number',
    width: 200,
  },
  {
    field: 'reviewerId',
    headerName: '작성자',
    type: 'string',
  },
  {
    field: 'registDate',
    headerName: '작성일',
    type: 'date',
    valueGetter: ({ value }) => value && new Date(value),
  },
];

function Review() {
  const {
    filterButtonEl,
    reviewList,
    visible,
    selectedStation,
    setFilterButtonEl,
    setReviewList,
    setVisible,
    setSelectedStation,
  } = useStoreReview((state) => state);
  const [date, setDate] = useState(new Date());
  const selectedRow = useRef({
    stationId: '',
    contents: '',
    starPoint: 5,
    reviewerId: '',
    registDate: '',
  });
  const handleClickContent = useCallback((params, event) => {
    if (params.field === 'contents') {
      selectedRow.current = params.row;
      setVisible('detail', true);
    }
  }, []);
  const handleClickWriteReview = useCallback((params, event) => {
    setVisible('list', true);
  });
  const handleClickGetMyReview = useCallback((params, event) => {
    const res = api.get('/api/review/', { reviewerId: 'user01' });
    //console.log(res);
    //if (res.status === 200 || res.status === 302) {
    console.log(res.status);

    //}
  });

  /**
   * picker가 변경되면 핸들러에 변경된 date 값이 넘어 옵니다.
   * picker에 현재 설정된 값은 state date를 참조 하면 됩니다.
   
  const handleChangeDate = useCallback((date) => {
    //
    setDate(date);
  });
*/
  const handleSelectStation = useCallback((visible, stationData) => {
    setSelectedStation(stationData);
    setVisible('writing', visible);
  }, []);

  /**
   * 전체 리뷰 리스트를 서버로 부터 받아 온다.
   */
  const getReviewList = async () => {
    const res = await api.get('/api/users');
    if (res.status === 200 || res.status === 302) {
      console.log('ㅎㅇ');
      setReviewList(res.data);
    }

    return res;
  };

  useEffect(() => {
    // component 가 랜더링 될 때 실행되는 함수

    getReviewList();
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
        <h2>리뷰 조회</h2>
        <Button onClick={handleClickWriteReview}>새 리뷰 작성</Button>
        <Button onClick={handleClickGetMyReview}>나의 리뷰 보기</Button>
      </div>
      <div style={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={reviewList}
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

      <ReviewDetail
        isShow={visible['detail']}
        data={selectedRow.current}
        setVisible={setVisible}
        getReviewList={getReviewList}
      />
      <StationList
        isShow={visible['list']}
        setVisible={setVisible}
        onClickOk={handleSelectStation}
      />
      <ReviewWrite
        isShow={visible['writing']}
        data={selectedStation}
        setVisible={setVisible}
        getReviewList={getReviewList}
      />
    </Box>
  );
}

export default Review;
