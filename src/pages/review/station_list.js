import React, { useCallback, useRef, useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import api from '../../api';

import { useStoreReview } from '../../stores';

function StationList({ isShow, setVisible, onClickOk }) {
  const { myStationList, setMyStationList } = useStoreReview((state) => state);

  const getMyStationList = async () => {
    const res = await api.get('/api/myStation/790901');
    console.log(res);
    //if (res.status === 200 || res.status === 302) {
    setMyStationList(res.data);
    //}
    return res;
  };

  const radioGroupRef = React.useRef(null);
  const stationRef = React.useRef({});

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };
  const handleChange = (e) => {
    const stationId = e.target.closest('label').dataset?.stationId;
    const stationName = e.target.value;
    const rgstDate = e.target.closest('label').dataset?.rgstDate;

    stationRef.current = {
      stationId: stationId,
      stationName: stationName,
      rgstDate: rgstDate,
    };
  };

  const handleClose = () => {
    setVisible('list', false);
  };
  const handleOk = () => {
    setVisible('list', false);
    onClickOk(true, stationRef.current);
  };

  useEffect(() => {
    if (isShow) {
      getMyStationList();
    }
  }, [isShow]);

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      maxWidth="xs"
      TransitionProps={{ onEntering: handleEntering }}
      open={isShow}
    >
      <DialogTitle>내가 이용한 충전소 목록</DialogTitle>
      <DialogContent dividers>
        <RadioGroup
          ref={radioGroupRef}
          aria-label="stations"
          name="stations"
          onChange={handleChange}
        >
          {myStationList.map(({ stationId, stationName, rgstDate, id }) => (
            <FormControlLabel
              value={`${stationName} | ${id}`}
              key={id}
              control={<Radio />}
              label={`${stationName} | ${id}`}
              data-station-id={stationId}
              data-rgst-date={rgstDate}
            />
          ))}
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Cancel
        </Button>
        <Button onClick={handleOk}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
}

export default StationList;
