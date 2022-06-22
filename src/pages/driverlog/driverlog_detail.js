import React, { useCallback, useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  Grid,
  TextareaAutosize,
  TextField
} from '@mui/material';
import DriverLogWrite from './driverlog_writing';
import api from '../../api';
import {
  LocalizationProvider,
  DatePicker,
} from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

export default function DriverLogDetail({ data, isShow, setVisible,
  reloadList, }) {
  const handleClose = () => {
    setVisible('detail', false);
  };

  const handleDelete = () => {
    console.log(data.id);
    api.delete('/api/driverlogs/' + data.id, null, handleRefReload);
    reloadList();
  };

  const handleSave = () => {};

  //Data Picker 변수
  const [date, setDate] = useState();

  const handleChangeDate = useCallback((date) => {
    //
    setDate(date);
  });

  const handleRefReload = (event) => {
    setVisible('detail', false);
    reloadList();
  };

  return (
    <Dialog open={isShow} onClose={handleClose}>
      <DialogTitle>차계부 상세보기</DialogTitle>
      <DialogContent>
        {/* 첫번째 행 */}
        <Grid container sx={{ padding: '10px 0' }}>
          <Grid item xs>
            <Typography variant="subtitle1">이용 충전소</Typography>
          </Grid>
          <Grid item xs>
            <Typography variant="subtitle1" readOnly>
              {data.stationName}
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography variant="subtitle1">충전일자</Typography>
          </Grid>
          <Grid item xs>
            <Typography variant="subtitle1" readOnly>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  inputFormat="yyyy-MM-dd"
                  value={date}
                  onChange={handleChangeDate}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Typography>
          </Grid>
          {/* <Grid item xs>
            <Typography variant="subtitle1">작성자</Typography>
          </Grid>
          <Grid item xs>
            <Typography variant="subtitle1" readOnly>
              {data.loginId}
            </Typography>
          </Grid> */}
        </Grid>

        {/* 두번째 행 */}
        <Grid container sx={{ padding: '10px 0' }}>
          <Grid item xs>
            <Typography variant="subtitle1">충전기 타입</Typography>
          </Grid>
          <Grid item xs>
            <Typography variant="subtitle1" readOnly>
              {data.chargerType}
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography variant="subtitle1">현재 키로수</Typography>
          </Grid>
          <Grid item xs>
            <TextareaAutosize
              id="nowMileage"
              style={{ width: 90 }}
              value={data.nowMileage}
            /> km
          </Grid>
        </Grid>

        {/* 세번째 행 */}
        <Grid container sx={{ padding: '10px 0' }}>
          <Grid item xs>
            <Typography variant="subtitle1">충전 전력량</Typography>
          </Grid>
          <Grid item xs>
            <TextareaAutosize
              id="chargeAmount"
              style={{ width: 90 }}
              value={data.chargeAmount}
            /> kW
          </Grid>
          <Grid item xs>
            <Typography variant="subtitle1">충전 요금</Typography>
          </Grid>
          <Grid item xs>
             <TextareaAutosize
                id="chargeFee"
                style={{ width: 90 }}
                value={data.chargeFee}
              /> 원
          </Grid>
        </Grid>

        {/* 네번째 행 */}
        <Grid container sx={{ padding: '10px 0' }}>
          <Grid item xs={1}>
            <Typography variant="subtitle1">메모</Typography>
          </Grid>
          <Grid item xs={3}>
            <TextareaAutosize
              id="memo"
              minRows={4}
              style={{ width: 500 }}
              value={data.memo}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSave}>Save</Button>
        <Button onClick={handleDelete}>Delete</Button>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

DriverLogWrite.defaultProps = {
  data: {
    id: '',
    nowMileage: '',
    chargeAmount: '',
    chargeFee: '',
    memo: '',
    loginId: '',
    chargerDate: '',
  },
};
