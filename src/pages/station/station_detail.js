import React, { useState, useCallback, useRef } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Box,
  Grid,
  Typography,
  TextareaAutosize,
  Rating,
  CssBaseline,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from '@mui/material';
import StationWrite from './station_writing';
import api from '../../api';

export default function StationDetail({
  data,
  isShow,
  setVisible,
  reloadList,
}) {
  const stationName = useRef();
  const stationAddress = useRef();
  const availableTime = useRef();
  const repairCompanyName = useRef();
  const repairCompanyTel = useRef();
  const [isFreeParking, setIsFreeParking] = useState('');
  const [adminId, setAdminId] = useState('admin1');
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('md');

  const handleClose = () => {
    setVisible('detailStation', false);
  };

  const handleDelete = () => {
    console.log(data.id);
    api.delete('/api/stations/' + data.id, null, handleRefReload);
    reloadList();
  };

  const handleSave = (e) => {
    console.log(e);
    console.log(stationName.current.value);
    console.log(stationAddress.current.value);
    console.log(availableTime.current.value);
    console.log(isFreeParking);
    console.log(repairCompanyName.current.value);
    console.log(repairCompanyTel.current.value);

    api.put(
      'api/stations',
      {
        id: data.id,
        stationName: stationName.current.value,
        stationAddress: stationAddress.current.value,
        availableTime: availableTime.current.value,
        isFreeParking: isFreeParking,
        repairCompanyName: repairCompanyName.current.value,
        repairCompanyTel: repairCompanyTel.current.value,
        adminId: adminId,
      },
      null,
      handleRefReload
    );
  };
  const handleRefReload = (event) => {
    setVisible('detailStation', false);
    reloadList();
  };
  const handleIsFreeParking = (e) => {
    e.preventDefault();
    setIsFreeParking(e.target.value);
  };

  const [inputs, setInputs] = useState({
    stationName: null,
    stationAddress: null,
    availableTime: null,
    repairCompanyName: null,
    repairCompanyTel: null,
  });

  const handleInputChange = (e) => {
    const { value, id } = e.target; // 우선 e.target 에서 id 과 value 를 추출
    setInputs({
      ...inputs,
      [id]: value, // id 키를 가진 값을 value 로 설정
    });
  };

  return (
    <Dialog
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      open={isShow}
      onClose={handleClose}
    >
      <DialogTitle>충전소 상세</DialogTitle>
      <DialogContent>
        <Grid container sx={{ padding: '10px 0' }}>
          <Grid item xs={2}>
            <Typography variant="subtitle1">충전소명</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="subtitle1">
              <TextField
                required
                id="stationName"
                label="required"
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
            <Typography variant="subtitle1">위치</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="subtitle1">
              <TextField
                required
                id="stationAddress"
                variant="outlined"
                size="small"
                inputRef={stationAddress}
                value={
                  inputs.stationAddress === null
                    ? data.stationAddress
                    : inputs.stationAddress
                }
                onChange={handleInputChange}
              />
            </Typography>
          </Grid>
        </Grid>
        <Grid container sx={{ padding: '10px 0' }}>
          <Grid item xs={2}>
            <Typography variant="subtitle1">이용가능시간</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="subtitle1">
              <TextField
                id="availableTime"
                variant="outlined"
                size="small"
                inputRef={availableTime}
                value={
                  inputs.availableTime === null
                    ? data.availableTime
                    : inputs.availableTime
                }
                onChange={handleInputChange}
              />
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="subtitle1">무료주차</Typography>
          </Grid>
          <Grid item xs={4}>
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="isFreeParking"
              >
                <FormControlLabel
                  value="true"
                  control={<Radio />}
                  label="무료"
                  onChange={handleIsFreeParking}
                  checked={
                    isFreeParking === ''
                      ? data.isFreeParking === true
                      : isFreeParking === 'true'
                  }
                />
                <FormControlLabel
                  value="false"
                  control={<Radio />}
                  label="유료"
                  onChange={handleIsFreeParking}
                  checked={
                    isFreeParking === ''
                      ? data.isFreeParking === false
                      : isFreeParking === 'false'
                  }
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container sx={{ padding: '10px 0' }}>
          <Grid item xs={2}>
            <Typography variant="subtitle1">운영업체명</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="subtitle1">
              <TextField
                id="repairCompanyName"
                variant="outlined"
                size="small"
                inputRef={repairCompanyName}
                value={
                  inputs.repairCompanyName === null
                    ? data.repairCompanyName
                    : inputs.repairCompanyName
                }
                onChange={handleInputChange}
              />
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="subtitle1">운영업체 연락처</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="subtitle1">
              <TextField
                id="repairCompanyTel"
                variant="outlined"
                size="small"
                inputRef={repairCompanyTel}
                value={
                  inputs.repairCompanyTel === null
                    ? data.repairCompanyTel
                    : inputs.repairCompanyTel
                }
                onChange={handleInputChange}
              />
            </Typography>
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

StationWrite.defaultProps = {
  data: {
    stationId: '',
    contents: '',
    starPoint: 5,
    reviewerId: '',
    registDate: '',
  },
};
