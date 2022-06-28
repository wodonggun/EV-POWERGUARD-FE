import React, { useState, useEffect } from 'react';
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
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useConfirm } from 'material-ui-confirm';

export default function DriverLogDetail({
  data,
  isShow,
  setVisible,
  reloadList,
}) {
  const setDriverLog = useState;
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
    console.log(inputs);
    console.log(data.id);
    console.log(stationId);
    console.log(chargerType);
    console.log(stationName);
    console.log(chargeDate);
    console.log(nowMileage);
    console.log(beforeMileage);
    console.log(chargeAmount);
    console.log(chargeFee);
    console.log(memo);
    console.log(data.loginId);

    confirm({ description: `수정하시겠습니까?` })
      .then(() => {
        getModify();
      })
      .catch(() => console.log('Save cancelled.'));
  };

  const getModify = async() => {
    let res = await api.patch('api/driverlogs/'+data.id, inputs, null, handleRefReload);

    if (res.status === 200 || res.status === 302) {
      console.log('****************수정됨*******************');
      
      console.log(res.data);
    }
  };

  // const handleChangeDate = (newStartDate) => {
  //   console.log("*****************handleChangeDate호출*****************");
  //   console.log(newStartDate);
  //   setInputs({chargDate : newStartDate});
  // };

  const handleRefReload = (event) => {
    console.log("handleRefReload 탔어요.");
    setVisible('detail', false);
    reloadList();
  };

  const [inputs, setInputs] = useState({
    id: '',
    stationId: '',
    stationName: '',
    chargerId: '',
    carName: '',
    batteryCapacity: '',
    chargerType: '',
    chargeDate: '',
    beforeMileage: '',
    nowMileage: '',
    chargeAmount: '',
    chargeFee: '',
    electronicEffiency: '',
    memo: '',
    loginId: '',
  });
  const {
    id,
    stationId,
    stationName,
    chargerId,
    carName,
    batteryCapacity,
    chargerType,
    chargeDate,
    beforeMileage,
    nowMileage,
    chargeAmount,
    chargeFee,
    electronicEffiency,
    memo,
    loginId,
  } = inputs;

  const handleInputChange = (e) => {
    const { value, id } = e.target; // 우선 e.target 에서 id 과 value 를 추출
    console.log("*********************handleInputChange 시작**************************")
    setInputs({
      ...inputs,
      [id]: value, // id 키를 가진 값을 value 로 설정
    });
  };

  /**
   * 차계부 상세를 서버에서 조회해 온다.
   */
   const getDriverLog = async () => {
    console.log(data.id);
    const res = await api.get('/api/driverlogs/' + data.id);
    console.log(res);
    if (res.status === 200 || res.status === 302) {
      console.log('****************setInputs시작*******************');
      //setDriverLog(res.data);
      setInputs(res.data);
      // console.log(res.data);
      // console.log(res.data.id);
      console.log('****************inputs 값 출력*******************');
      console.log(inputs);
    }

    return res;
  };
  
  useEffect(() => { 
    if (isShow) {
      console.log("getDriverLog() 호출" + isShow);
      getDriverLog(); 
    } }, [isShow]);

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
                  disabled
                  id="stationName"
                  value={stationName}
                />    
              {/* <TextField
                id="stationName"
                variant="outlined"
                size="small"
                value={stationName}
                onChange={handleInputChange}
              /> */}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="subtitle1">충전일자</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="subtitle1">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <MobileDateTimePicker
                  id="chargeDate"
                  value={chargeDate}
                  onChange={(newValue) => {
                    setInputs({ ...inputs, ["chargeDate"]: newValue, });                    
                  }}
                  onError={console.log}
                  inputFormat="yyyy/MM/dd hh:mm a"
                  mask="___/__/__ __:__ _M"
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Typography>
          </Grid>
        </Grid>

        {/* 두번째 행 */}
        <Grid container sx={{ padding: '10px 0' }}>
          <Grid item xs={2}>
            <Typography variant="subtitle1">충전기 타입</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="subtitle1" readOnly>
              <TextField
                disabled
                id="chargerType"
                value={chargerType}
              />              
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
              //inputRef={nowMileage}
              value={nowMileage}
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
              //inputRef={chargeAmount}
              value={
                chargeAmount
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
              //inputRef={chargeFee}
              value={
                chargeFee
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
              //inputRef={memo}
              value={memo}
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
