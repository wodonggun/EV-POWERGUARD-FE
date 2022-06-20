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

export default function ChargerWrite({ data, isShow, setVisible, reloadList }) {
  const chargerName = useRef();
  const serialNumber = useRef();
  const [operationStatus, setOperationStatus] = useState();
  const [chargerType, setChargerType] = useState();
  const modelNo = useRef();
  const [connectorType, setConnectorType] = useState();
  const inputVoltage = useRef();
  const outputVoltage = useRef();
  const ratedCapacity = useRef();
  const chargingTime = useRef();

  const [adminId, setAdminId] = useState('admin1');
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('md');

  const handleClose = (event) => {
    setVisible('writingCharger', false);
  };
  const handleSave = (e) => {
    console.log(e);
    console.log(chargerType);

    api.post(
      'api/stations/chargers',
      {
        chargingStationId: data.id,
        operationStatus: operationStatus,
        chargerType: chargerType,
        chargerName: chargerName.current.value,
        serialNumber: serialNumber.current.value,
        modelNo: modelNo.current.value,
        connectorType: connectorType,
        inputVoltage: inputVoltage.current.value,
        outputVoltage: outputVoltage.current.value,
        ratedCapacity: ratedCapacity.current.value,
        chargingTime: chargingTime.current.value,
      },
      null,
      handleRefReload
    );
  };
  const handleRefReload = (event) => {
    setVisible('writingCharger', false);
    reloadList();
  };
  const handleOperationStatus = (e) => {
    e.preventDefault();
    setOperationStatus(e.target.value);
  };
  const handleChargerType = (e) => {
    e.preventDefault();
    setChargerType(e.target.value);
  };
  const handleConnectorType = (e) => {
    e.preventDefault();
    setConnectorType(e.target.value);
  };

  return (
    <Dialog
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      open={isShow}
      onClose={handleClose}
    >
      <DialogTitle>충전기 등록</DialogTitle>
      <DialogContent>
        <Grid container sx={{ padding: '10px 0' }}>
          <Grid item xs={2}>
            <Typography variant="subtitle1">충전기명</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="subtitle1">
              <TextField
                required
                id="chargerName"
                label="required"
                variant="outlined"
                size="small"
                value="충전기1"
                inputRef={chargerName}
              />
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="subtitle1">시리얼번호</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="subtitle1">
              <TextField
                required
                id="serialNumber"
                variant="outlined"
                size="small"
                value="SN-ABC-1111"
                inputRef={serialNumber}
              />
            </Typography>
          </Grid>
        </Grid>
        <Grid container sx={{ padding: '10px 0' }}>
          <Grid item xs={2}>
            <Typography variant="subtitle1">충전기 종류</Typography>
          </Grid>
          <Grid item xs={4}>
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="chargerType"
              >
                <FormControlLabel
                  value="FAST"
                  control={<Radio />}
                  label="급속"
                  onChange={handleChargerType}
                />
                <FormControlLabel
                  value="NORMAL"
                  control={<Radio />}
                  label="완속"
                  onChange={handleChargerType}
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="subtitle1">충전기 상태</Typography>
          </Grid>
          <Grid item xs={4}>
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="operationStatus"
              >
                <FormControlLabel
                  value="AVAILABLE"
                  control={<Radio />}
                  label="사용가능"
                  onChange={handleOperationStatus}
                />
                <FormControlLabel
                  value="BROKEN"
                  control={<Radio />}
                  label="점검중"
                  onChange={handleOperationStatus}
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container sx={{ padding: '10px 0' }}>
          <Grid item xs={2}>
            <Typography variant="subtitle1">모델번호</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="subtitle1">
              <TextField
                id="modelNo"
                variant="outlined"
                size="small"
                value="24시간"
                inputRef={modelNo}
              />
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="subtitle1">커넥터</Typography>
          </Grid>
          <Grid item xs={4}>
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="connectorType"
              >
                <FormControlLabel
                  value="DC차데모"
                  control={<Radio />}
                  label="DC차데모"
                  onChange={handleConnectorType}
                />
                <FormControlLabel
                  value="DC콤보"
                  control={<Radio />}
                  label="DC콤보"
                  onChange={handleConnectorType}
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container sx={{ padding: '10px 0' }}>
          <Grid item xs={2}>
            <Typography variant="subtitle1">입력전압</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="subtitle1">
              <TextField
                id="inputVoltage"
                variant="outlined"
                size="small"
                value="10V"
                inputRef={inputVoltage}
              />
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="subtitle1">출력전압</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="subtitle1">
              <TextField
                id="outputVoltage"
                variant="outlined"
                size="small"
                value="02-1111-2222"
                inputRef={outputVoltage}
              />
            </Typography>
          </Grid>
        </Grid>
        <Grid container sx={{ padding: '10px 0' }}>
          <Grid item xs={2}>
            <Typography variant="subtitle1">정격용량</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="subtitle1">
              <TextField
                id="ratedCapacity"
                variant="outlined"
                size="small"
                value="10V"
                inputRef={ratedCapacity}
              />
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="subtitle1">충전시간</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="subtitle1">
              <TextField
                id="chargingTime"
                variant="outlined"
                size="small"
                value="30분"
                inputRef={chargingTime}
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
