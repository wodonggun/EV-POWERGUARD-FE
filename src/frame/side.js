import React from 'react';
import { List } from '@mui/material';
import RateReviewIcon from '@mui/icons-material/RateReview';
import DriverLogIcon from '@mui/icons-material/ElectricCar';
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
import BreakdownIcon from '@mui/icons-material/PowerOff';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import { MenuItem } from '../components/list_item';

function Side() {
  const [selectedIndex, setSelectedIndex] = React.useState(null);

  const handleListItemClick = (event, index) => {
    //로그인 안되어 있으면 페이지 이동 막기.
    //테스트하실때는 강제로 아래 주석풀어서 세션스토리지에 넣고 사용하세요.
    //----------------------------------------------- ToDo. 아래 세션 체크 로직 변경해주세요. by JIN 2022-06-24
    let sessionStorage = window.sessionStorage;
    //sessionStorage.setItem('id', 'TEST@naver.com');
    let id = sessionStorage.getItem('id');
    if (id === null || id === '' || id === 'GUEST') {
      alert('로그인 먼저 진행해주세요.');
      event.preventDefault();
    } else {
      setSelectedIndex(index);
    }
  };
  /* 메뉴 추가 */
  const itemList = [
    {
      icon: LocalGasStationIcon,
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
      icon: BreakdownIcon,
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
