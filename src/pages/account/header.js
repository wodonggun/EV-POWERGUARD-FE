import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useStoreAuth } from '../../stores';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import LogOut from './components/LoggedOut';

const pages = ['로그인', '회원가입', '회원수정', '[이부분 나중에 지울께요]'];
const settings = ['Profile', 'Login', 'Logout'];

const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState();
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const navigate = useNavigate();
  let sessionStorage = window.sessionStorage;

  // ID, 프로필사진, 로그인토큰, 유저권한
  const {
    userId,
    userProfileImg,
    userToken,
    userMemberShip,
    setUserId,
    setUserProfileImg,
    setInitialize,
  } = useStoreAuth((state) => state);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (props) => {
    if (props === '로그인') {
      navigate('/signIn');
    } else if (props === '회원가입') {
      navigate('/signUp');
    } else if (props === '회원수정') {
      navigate('/signEdit');
    } else if (props === '') {
      navigate('');
    }
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (props) => {
    setAnchorElUser(props.key);
  };

  let loginId = sessionStorage.getItem('id');
  if (loginId !== null || loginId !== '') {
    setUserId(loginId);
  }

  let loginImg = sessionStorage.getItem('profile_image');
  if (loginImg !== null && loginImg !== '') {
    setUserProfileImg(loginImg);
  }

  React.useEffect(() => {
    // component 가 랜더링 될 때 실행되는 함수
  }, []);

  return (
    <AppBar position="static">
      <Container maxWidth="false">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            EV-POWER-GUARD
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => {
                return (
                  <MenuItem
                    key={page}
                    onClick={() => {
                      console.log(page);
                      return handleCloseNavMenu(page);
                    }}
                  >
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                );
              })}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            EV-POWER_GUARD 모바일
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => {
                  return handleCloseNavMenu(page);
                }}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {`${userId}  `}
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={userProfileImg} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  id={setting}
                  key={setting}
                  onClick={
                    (handleCloseUserMenu,
                    (props) => {
                      if (props.target.innerHTML === 'Logout') {
                        navigate('/signIn', { replace: true });
                        LogOut();
                        setInitialize();
                      } else if (props.target.innerHTML === 'Profile') {
                        navigate('/signEdit', { replace: true });
                      } else if (props.target.innerHTML === 'Login') {
                        navigate('/signIn', { replace: true });
                      }
                    })
                  }
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
