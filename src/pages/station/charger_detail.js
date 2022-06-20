import React, { useState, useCallback, useRef, useEffect } from 'react';
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
  Checkbox,
  FormGroup,
} from '@mui/material';
import ChargerWrite from './station_writing';
import api from '../../api';

export default function ChargerDetail({
  data,
  isShow,
  setVisible,
  reloadList,
}) {
  const chargerName = useRef();
  const serialNumber = useRef();
  const [operationStatus, setOperationStatus] = useState('');
  const [chargerType, setChargerType] = useState('');
  const modelNo = useRef();
  const [connectorType, setConnectorType] = useState('');
  const inputVoltage = useRef();
  const outputVoltage = useRef();
  const ratedCapacity = useRef();
  const chargingTime = useRef();

  const [adminId, setAdminId] = useState('admin1');
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('md');

  const handleClose = (event) => {
    setVisible('detailCharger', false);
  };

  const handleDelete = () => {
    console.log(data.id);
    console.log('chargingStationId ' + data.chargingStationId);
    api.delete('/api/stations/chargers/' + data.id, null, handleRefReload);
    reloadList();
  };

  const handleSave = (e) => {
    console.log(e);

    api.put(
      'api/stations/chargers',
      {
        id: data.id,
        chargingStationId: data.chargingStationId,
        operationStatus:
          operationStatus === '' ? data.operationStatus : operationStatus,
        chargerType: chargerType === '' ? data.chargerType : chargerType,
        chargerName: chargerName.current.value,
        serialNumber: serialNumber.current.value,
        modelNo: modelNo.current.value,
        connectorType:
          connectorType === '' ? data.connectorType : connectorType,
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
    setVisible('detailCharger', false);
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

  const [inputs, setInputs] = useState({
    chargerName: null,
    serialNumber: null,
    modelNo: null,
    inputVoltage: null,
    outputVoltage: null,
    ratedCapacity: null,
    chargingTime: null,
  });

  //const { chargerNameInput, serialNumberInput } = inputs; // 비구조화 할당을 통해 값 추출

  const handleInputChange = (e) => {
    const { id, value } = e.target; // 우선 e.target 에서 id 과 value 를 추출
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
      <DialogTitle>충전기 상세</DialogTitle>
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
                inputRef={chargerName}
                value={
                  inputs.chargerName === null
                    ? data.chargerName
                    : inputs.chargerName
                }
                onChange={handleInputChange}
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
                inputRef={serialNumber}
                value={
                  inputs.serialNumber === null
                    ? data.serialNumber
                    : inputs.serialNumber
                }
                onChange={handleInputChange}
              />
            </Typography>
          </Grid>
        </Grid>
        <Grid container sx={{ padding: '10px 0' }}>
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
                  checked={
                    operationStatus === ''
                      ? data.operationStatus === 'AVAILABLE'
                      : operationStatus === 'AVAILABLE'
                  }
                />
                <FormControlLabel
                  value="BROKEN"
                  control={<Radio />}
                  label="점검중"
                  onChange={handleOperationStatus}
                  checked={
                    operationStatus === ''
                      ? data.operationStatus === 'BROKEN'
                      : operationStatus === 'BROKEN'
                  }
                />
              </RadioGroup>
            </FormControl>
          </Grid>
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
                  checked={
                    chargerType === ''
                      ? data.chargerType === 'FAST'
                      : chargerType === 'FAST'
                  }
                />
                <FormControlLabel
                  value="NORMAL"
                  control={<Radio />}
                  label="완속"
                  onChange={handleChargerType}
                  checked={
                    chargerType === ''
                      ? data.chargerType === 'NORMAL'
                      : chargerType === 'NORMAL'
                  }
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
                inputRef={modelNo}
                value={inputs.modelNo === null ? data.modelNo : inputs.modelNo}
                onChange={handleInputChange}
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
                  checked={
                    connectorType === ''
                      ? data.connectorType === 'DC차데모'
                      : connectorType === 'DC차데모'
                  }
                />
                <FormControlLabel
                  value="DC콤보"
                  control={<Radio />}
                  label="DC콤보"
                  onChange={handleConnectorType}
                  checked={
                    connectorType === ''
                      ? data.connectorType === 'DC콤보'
                      : connectorType === 'DC콤보'
                  }
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
                inputRef={inputVoltage}
                value={
                  inputs.inputVoltage === null
                    ? data.inputVoltage
                    : inputs.inputVoltage
                }
                onChange={handleInputChange}
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
                inputRef={outputVoltage}
                value={
                  inputs.outputVoltage === null
                    ? data.outputVoltage
                    : inputs.outputVoltage
                }
                onChange={handleInputChange}
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
                inputRef={ratedCapacity}
                value={
                  inputs.ratedCapacity === null
                    ? data.ratedCapacity
                    : inputs.ratedCapacity
                }
                onChange={handleInputChange}
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
                inputRef={chargingTime}
                value={
                  inputs.chargingTime === null
                    ? data.chargingTime
                    : inputs.chargingTime
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

ChargerWrite.defaultProps = {
  data: {},
};
