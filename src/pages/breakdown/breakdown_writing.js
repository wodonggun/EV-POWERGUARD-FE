import React, { useState, useCallback, useRef } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  Button,
  TextField,
  Typography,
  Rating,
  Grid,
  TextareaAutosize,
  DialogContentText,
} from '@mui/material';

import RenderStatusChip from './components/statusChip';
import api from '../../api';

export default function BreakdownWrite({
  data,
  isShow,
  setVisible,
  refreshList,
}) {
  const [disabled, setDisabled] = useState(false);
  const [reportStatus, setReportStatus] = useState('SUBMITTED');
  const [reportDescription, setReportDescription] = useState('');
  const [reportedTime, setReportedTime] = useState();
  const [breakdownChargerId, setBreakdownChargerId] = useState();
  const [stationId, setStationId] = useState();
  const [stationName, setStationName] = useState();
  const [location, setLocation] = useState('somewhere');
  const [adminId, setAdminId] = useState('9999');
  const [adminPhoneNumber, setAdminPhoneNumber] = useState('010-0080-0080');
  const [reporterId, setReporterId] = useState('9999');
  const [reporterName, setReporterName] = useState('tmp-ui-user');

  const REQ_PENDING = 'REQ_PENDING';
  const REQ_SUCCESS = 'REQ_SUCCESS';
  const REQ_FAILURE = 'REQ_FAILURE';

  const handleClose = (event) => {
    setVisible('writing', false);
    refreshList();
  };
  const handleSave = async (e) => {
    setDisabled(true);
    e.preventDefault();
    // test용 하드코딩
    setStationName('station' + stationId);
    setLocation('somewhere');
    setAdminId('9999');
    setAdminPhoneNumber('010-0080-0080');
    setReporterId('9999');
    setReporterName('tmp-ui-user');

    api
      .post(
        '/api/breakdown/reports',
        JSON.stringify({
          reportStatus: reportStatus,
          reportDescription: reportDescription,
          reportedTime: new Date(),

          breakdownChargerId: breakdownChargerId,
          stationId: stationId,
          stationName: stationName,
          location: location,
          adminId: adminId,
          adminPhoneNumber: adminPhoneNumber,

          reporterId: reporterId,
          reporterName: reporterName,
        }),
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
      .then((result) => {
        console.log('submitReport result: ');
        console.log(result);
        if (result.status == 202) {
          alert('이미 신고된 충전기입니다.');
        } else if (result.status == 200) {
          alert('고장신고 제출 완료!!');
        } else {
          alert('확인되지 않은 오류입니다. 다시 시도해 주세요.');
        }
        setDisabled(false);
        handleClose();
      })
      .catch((error) => {
        alert(error.log);
        setDisabled(false);
        throw error;
      });
  };

  return (
    <Dialog open={isShow} onClose={handleClose}>
      <DialogContentText
        align="center"
        fontSize="20px"
        padding="10px 0px 0px 0px"
      >
        충전기 고장신고
      </DialogContentText>
      <DialogContent>
        <TextField
          id="stationId"
          label="충전소ID"
          variant="filled"
          onChange={(e) => {
            setStationId(e.target.value);
            setStationName('station' + e.target.value);
          }}
        />
        <TextField
          id="breakdownChargerId"
          label="충전기ID"
          variant="filled"
          onChange={(e) => setBreakdownChargerId(e.target.value)}
        />
      </DialogContent>
      <DialogContent>
        <Grid container sx={{ padding: '10px 0' }}>
          <Grid item xs={2}>
            <Typography variant="subtitle1">위치</Typography>
          </Grid>
          <Grid item>
            <TextField
              id="location"
              label="위치 입력"
              variant="filled"
              value="somewhere"
            />
          </Grid>
        </Grid>
        <Grid container direction="row" sx={{ padding: '10px 0' }}>
          <Grid item xs={2}>
            <Typography variant="subtitle1">상세내역</Typography>
          </Grid>
          <Grid item xs={3}>
            <TextareaAutosize
              minRows={3}
              style={{ width: 400 }}
              value={data.reportDescription}
              onChange={(e) => setReportDescription(e.target.value)}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSave} disabled={disabled}>
          Save
        </Button>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
