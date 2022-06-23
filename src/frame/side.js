import React from 'react';
import { List } from '@mui/material';
import RateReviewIcon from '@mui/icons-material/RateReview';
import DriverLogIcon from '@mui/icons-material/ElectricCar';
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
import { MenuItem } from '../components/list_item';

function Side() {
  const [selectedIndex, setSelectedIndex] = React.useState(null);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  /* 메뉴 추가 */
  const itemList = [
    {
      icon: EditLocationAltIcon,
      url: '/station',
      name: 'Station',
      handleClick: handleListItemClick,
    },
    {
      icon: RateReviewIcon,
      url: '/review',
      name: 'Review',
      handleClick: handleListItemClick,
    },
    {
      icon: DriverLogIcon,
      url: '/driverlog',
      name: 'DriverLog',
      handleClick: handleListItemClick,
    },
    {
      icon: EditLocationAltIcon,
      url: '/mystations',
      name: 'MyStation',
      handleClick: handleListItemClick,
    },
    {
      icon: EditLocationAltIcon,
      url: '/breakdown',
      name: 'Breakdown',
      handleClick: handleListItemClick,
    },
    {
      icon: EditLocationAltIcon,
      url: '/bookmark',
      name: 'Bookmark',
      handleClick: handleListItemClick,
    },
  ];
  return (
    <List>
      {itemList.map((info, index) => (
        <MenuItem
          key={index}
          index={index}
          {...info}
          isSelected={index === selectedIndex}
        ></MenuItem>
      ))}
    </List>
  );
}
export default Side;
