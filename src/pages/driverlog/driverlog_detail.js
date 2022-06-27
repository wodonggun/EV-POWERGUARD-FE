import React, { useCallback, useState, useRef, useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  Grid,
  TextField,
  Box,
} from '@mui/material';
import DriverLogWrite from './driverlog_writing';
import api from '../../api';
import { useStoreDriverLog } from '../../stores';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useConfirm } from 'material-ui-confirm';

export default function DriverLogDetail({
  data,
  isShow,
  setVisible,
  reloadList,
}) {
  const setDriverLog = useStoreDriverLog((state) => state);

  const stationName = useRef();
  const chargeDate = useRef();
  const nowMileage = useRef();
  const chargeAmount = useRef();
  const chargeFee = useRef();
  const memo = useRef();
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('md');
  const confirm = useConfirm();

  const handleClose = () => {
    setVisible('detail', false);
  };
  
  const handleDelete = () => {
    console.log(data.id);
    confirm({ description: `삭제하시겠습니까?` })
      .then(() => {
        api.delete('/api/driverlogs/' + data.id, null, handleRefReload);
      })
      .catch(() => console.log('Deletion cancelled.'));
  };

  const handleSave = (e) => {
    console.log(data);
    console.log(data.id);
    console.log(data.stationId);
    console.log(data.chargerType);
    console.log(stationName.current.value);
    console.log(startDate);
    console.log(nowMileage.current.value);
    console.log(chargeAmount.current.value);
    console.log(chargeFee.current.value);
    console.log(memo.current.value);
    console.log(data.loginId);

    confirm({ description: `수정하시겠습니까?` })
      .then(() => {
        api.put(
          'api/driverlogs',
          {
            id: data.id,
            stationId: data.stationId,
            stationName: stationName.current.value,
            chargeDate: startDate,
            chargerType: data.chargerType,
            nowMileage: nowMileage.current.value,
            chargeAmount: chargeAmount.current.value,
            chargeFee: chargeFee.current.value,
            memo: memo.current.value,
            loginId: data.loginId,
          },
          null,
          handleRefReload
        );
      })
      .catch(() => console.log('Save cancelled.'));
  };

  //Data Picker 변수
  const [startDate, setStartDate] = useState();

  console.warn('경고');
  console.log('data.chargeDate는 %d', data.chargeData);

  const handleChangeDate = (newStartDate) => {
    setStartDate(newStartDate);
  };

  const handleRefReload = (event) => {
    setVisible('detail', false);
    reloadList();
  };

  const [inputs, setInputs] = useState({
    stationName: null,
    chargeDate: null,
    nowMileage: null,
    chargeAmount: null,
    chargeFee: null,
    memo: null,
  });

  const handleInputChange = (e) => {
    const { value, id } = e.target; // 우선 e.target 에서 id 과 value 를 추출
    setInputs({
      ...inputs,
      [id]: value, // id 키를 가진 값을 value 로 설정
    });
    console.log(inputs);
  };

  /**
   * 차계부 상세를 서버에서 조회해 온다.
   */
   const getDriverLog = async () => {
    console.log(data.id);
    const res = await api.get('/api/driverlogs/' + data.id);
    if (res.status === 200 || res.status === 302) {
      console.log('***********************************');
      setDriverLog(res.data);
    }

    return res;
  };
  
  useEffect(() => { 
    console.log("getDriverLog() 호출");

    if (isShow) { getDriverLog(); } }, [isShow]);
    
  return (
    <Dialog
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      open={isShow}
      onClose={handleClose}
    >
      <DialogTitle>차계부 상세보기</DialogTitle>
      <DialogContent>
        {/* 첫번째 행 */}
        <Grid container sx={{ padding: '10px 0' }}>
          <Grid item xs={2}>
            <Typography variant="subtitle1">이용 충전소</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="subtitle1">
              <TextField
                id="stationName"
                variant="outlined"
                size="small"
                inputRef={stationName}
                value={
                  inputs.stationName === null
                    ? data.stationName
                    : inputs.stationName
                }
                onChange={handleInputChange}
              />
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="subtitle1">충전일자</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="subtitle1">

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  id="chargeDate"
                  defaultValue={
                    data.chargeDate}
                    //startDate === null
                    //? data.chargeDate
                    //: startDate}
                  inputFormat="yyyy/MM/dd hh:mm a"
                  mask="___/__/__ __:__ _M"
                  //onChange={handleChangeDate}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>


              {/* <Typography variant="subtitle1">
                <TextField
                  id="chargeDate"
                  variant="outlined"
                  size="small"
                  inputRef={chargeDate}
                  value={
                    inputs.chargeDate === null
                      ? data.chargeDate
                      : inputs.chargeDate
                  }
                  onChange={handleInputChange}
                />
              </Typography> */}
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
          <Grid item xs={2}>
            <Typography variant="subtitle1">충전기 타입</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="subtitle1" readOnly>
              {data.chargerType}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="subtitle1">현재 키로수</Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              id="nowMileage"
              variant="outlined"
              size="small"
              inputRef={nowMileage}
              value={
                inputs.nowMileage === null ? data.nowMileage : inputs.nowMileage
              }
              onChange={handleInputChange}
            />{' '}
            km
          </Grid>
        </Grid>

        {/* 세번째 행 */}
        <Grid container sx={{ padding: '10px 0' }}>
          <Grid item xs={2}>
            <Typography variant="subtitle1">충전 전력량</Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              id="chargeAmount"
              variant="outlined"
              size="small"
              inputRef={chargeAmount}
              value={
                inputs.chargeAmount === null
                  ? data.chargeAmount
                  : inputs.chargeAmount
              }
              onChange={handleInputChange}
            />{' '}
            kW
          </Grid>
          <Grid item xs={2}>
            <Typography variant="subtitle1">충전 요금</Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              id="chargeFee"
              variant="outlined"
              size="small"
              inputRef={chargeFee}
              value={
                inputs.chargeFee === null ? data.chargeFee : inputs.chargeFee
              }
              onChange={handleInputChange}
            />{' '}
            원
          </Grid>
        </Grid>

        {/* 네번째 행 */}
        <Grid container sx={{ padding: '10px 0' }}>
          <Grid item xs={2}>
            <Typography variant="subtitle1">메모</Typography>
          </Grid>
          <Grid item xs={10}>
            <TextField
              id="memo"
              fullWidth
              inputRef={memo}
              value={inputs.memo === null ? data.memo : inputs.memo}
              onChange={handleInputChange}
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
    stationName: '',
    nowMileage: '',
    chargeAmount: '',
    chargeFee: '',
    memo: '',
    loginId: '',
    chargeDate: '',
  },
};
