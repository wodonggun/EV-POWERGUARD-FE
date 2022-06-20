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

import api from '../../api';

export default function StationWrite({ data, isShow, setVisible, reloadList }) {
  const stationName = useRef();
  const stationAddress = useRef();
  const availableTime = useRef();
  const repairCompanyName = useRef();
  const repairCompanyTel = useRef();
  const [isFreeParking, setIsFreeParking] = useState();
  const [adminId, setAdminId] = useState('admin1');
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('md');

  const handleClose = (event) => {
    setVisible('writingStation', false);
  };
  const handleSave = (e) => {
    console.log(e);
    console.log(stationName.current.value);
    console.log(stationAddress.current.value);
    console.log(availableTime.current.value);
    console.log(isFreeParking);
    console.log(repairCompanyName.current.value);
    console.log(repairCompanyTel.current.value);

    api.post(
      'api/stations',
      {
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
    setVisible('writingStation', false);
    reloadList();
  };
  const handleIsFreeParking = (e) => {
    e.preventDefault();
    setIsFreeParking(e.target.value);
  };

  return (
    <Dialog
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      open={isShow}
      onClose={handleClose}
    >
      <DialogTitle>충전소 등록</DialogTitle>
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
                value="강남 역삼 충전소 111"
                inputRef={stationName}
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
                value="서울특별시 강남구 역삼동 111"
                inputRef={stationAddress}
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
                value="24시간"
                inputRef={availableTime}
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
                />
                <FormControlLabel
                  value="false"
                  control={<Radio />}
                  label="유료"
                  onChange={handleIsFreeParking}
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
                value="A업체"
                inputRef={repairCompanyName}
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
                value="02-1111-2222"
                inputRef={repairCompanyTel}
              />
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSave}>Save</Button>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
