import React from 'react';
import { Chip } from '@mui/material';

export default function RenderStatusChip(props) {
  const value = props.value;

  React.useLayoutEffect(() => {
    // console.log(props.value);
  }, []);

  return (
    <Chip
      label={value}
      variant={value === 'COMPLETED' ? 'filled' : 'outlined'}
      color={value === 'COMPLETED' ? 'success' : 'warning'}
    />
  );
}
