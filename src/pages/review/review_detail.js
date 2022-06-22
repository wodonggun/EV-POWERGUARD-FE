import React, { useState, useCallback, useRef } from 'react';
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
} from '@mui/material';
import ReviewWrite from './review_writing';
import api from '../../api';

export default function ReviewDetail({
  data,
  isShow,
  setVisible,
  getReviewList,
}) {
  const [starPoint, setStarPoint] = useState(5);
  const contentRef = useRef(null);

  //const [value, setValue] = (React.useState < number) | (null > 2);

  const handleClose = () => {
    setVisible('detail', false);
  };

  const handleDelete = () => {
    console.log(data.id);
    const res = api.delete('/api/review/', { id: data.id }, handleCloseDialog);
  };

  const handleSave = async () => {
    console.log(data.id);
    console.log(data.starPoint);
    //console.log(newValue);
    console.log(contentRef.current.value);
    console.log(data.stationId);
    const res = await api.put(
      '/api/review/update',
      {
        id: data.id,
        starPoint: data.starPoint,
        contents: contentRef.current.value,
        stationId: data.stationId,
      },
      handleCloseDialog
    );
  };

  const handleCloseDialog = () => {
    handleClose();
    getReviewList();
  };

  return (
    <Dialog open={isShow} onClose={handleClose}>
      <DialogTitle>리뷰 상세보기</DialogTitle>
      <DialogContent>
        <Grid container sx={{ padding: '10px 0' }}>
          <Grid item xs>
            <Typography variant="subtitle1">충전소</Typography>
          </Grid>
          <Grid item xs>
            <Typography variant="subtitle1" readOnly>
              {data.stationName}
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography variant="subtitle1">작성자</Typography>
          </Grid>
          <Grid item xs>
            <Typography variant="subtitle1" readOnly>
              {data.reviewerId}
            </Typography>
          </Grid>
        </Grid>

        <Grid container sx={{ padding: '10px 0' }}>
          <Grid item xs={2}>
            <Typography variant="subtitle1">평점</Typography>
          </Grid>

          <Grid item>
            <Rating
              name="starPoint"
              defaultValue={data.starPoint}
              //onChange={handleChangeStarPoint}
            />
          </Grid>
        </Grid>
        <Grid container direction="row" sx={{ padding: '10px 0' }}>
          <Grid item xs={1}>
            <Typography variant="subtitle1">리뷰</Typography>
          </Grid>
          <Grid item xs={3}>
            <TextareaAutosize
              minRows={3}
              style={{ width: 500 }}
              defaultValue={data.contents}
              ref={contentRef}
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

ReviewWrite.defaultProps = {
  data: {
    stationId: '',
    contents: '',
    starPoint: 5,
    reviewerId: '',
    registDate: '',
  },
};
