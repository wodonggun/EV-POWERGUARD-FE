import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  Rating,
  Grid,
  TextareaAutosize,
  DialogContentText,
} from '@mui/material';
import api from '../../api';
import RenderStatusChip from './components/statusChip';

export default function BreakdownDetail({
  data,
  isShow,
  setVisible,
  readOnlyDetail,
}) {
  const handleClose = () => {
    setVisible('detail', false);
  };
  return (
    <Dialog open={isShow} onClose={handleClose}>
      <DialogContentText
        align="center"
        fontSize="20px"
        padding="10px 0px 0px 0px"
      >
        고장신고 상세보기
      </DialogContentText>
      <DialogTitle align="center" fontSize="25px">
        {data.stationName}
        <Typography variant="span" fontSize="30px">
          {' '}
          {data.breakdownChargerId}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Grid container sx={{ padding: '10px 0' }}>
          <Grid item xs={2}>
            <Typography variant="subtitle1">상태</Typography>
          </Grid>
          <Grid item xs>
            <RenderStatusChip value={data.reportStatus} />
          </Grid>
        </Grid>

        <Grid container sx={{ padding: '10px 0' }}>
          <Grid item xs={2}>
            <Typography variant="subtitle1">위치</Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1">{data.location}</Typography>
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
              readOnly={false}
            />
          </Grid>
        </Grid>
        <Grid container sx={{ padding: '10px 0' }}>
          <Grid item xs={2}>
            <Typography variant="subtitle1">접수일자</Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1">
              {data.reportedTime == null ? '-' : data.reportedTime}
            </Typography>
          </Grid>
        </Grid>
        <Grid container sx={{ padding: '10px 0' }}>
          <Grid item xs={2}>
            <Typography variant="subtitle1">처리일자</Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1">
              {data.completedTime == null ? '-' : data.completedTime}
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
