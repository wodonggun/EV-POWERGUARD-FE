import React, { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import LoginGoogleButton from '../account/Oauth2/loginGoogle';
import LoginNaverButton from '../account/Oauth2/loginNaver';

import { gapi } from 'gapi-script';
import axios from 'axios';

import api from '../../api';
import { useStoreAuth } from '../../stores';
import { useNavigate } from 'react-router-dom';
import LoggedIn from '../account/components/LoggedIn';

const theme = createTheme();

const clientId =
  '235080019852-bi0219rldfmnd5tt5pblfvmkpsjdf9tk.apps.googleusercontent.com';

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="http://ev.hrd-edu.cloudzcp.com/">
        EV Power Guard
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function SignInSide() {
  const store = useStoreAuth();
  const navigate = useNavigate();
  let sessionStorage = window.sessionStorage;

  //submit 버튼 실행
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    LoggedIn(data);
    loginRequest(data);
  };

  const loginRequest = async (props) => {
    //Header ID정보 체크
    if (props.get('email') === null || props.get('email') === 0) {
      alert('ID 입력하세요');
    }
    if (props.get('password') === null || props.get('password') === 0) {
      alert('비밀번호 입력하세요.');
    }

    const res = await api.get(
      'http://localhost:8080/api/users/' + props.get('email')
    );
    if (res.status === 200 || res.status === 302) {
      alert('로그인 성공');
      console.log(res.data);
      store.setUserProfile(res.data.email, '', '');

      //로그인 성공
      let loginValue = {
        id: res.data.email,
        id_number: '',
        profileImg: '',
        email: res.data.email,
        access_token: '',
        id_token: '',
        member_type: res.data.memberType,
      };

      LoggedIn(loginValue);

      navigate('/station');
      console.log(res.data);
    } else {
      alert('로그인 실패 : ' + props.get('email') + '의 회원정보가 없습니다.');
    }
  };

  useEffect(() => {
    // component 가 랜더링 될 때 실행되는 함수
    // 로그인 되어있으면 Profile수정으로 라우트

  }, []);

  return (
    <Container>
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: '50vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage:
                'url(https://user-images.githubusercontent.com/35188271/168420890-0d406419-bf78-46ff-b5e5-a82befa83a38.png)',
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light'
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>

                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/signUp" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
                <Grid align="center">
                  {/* SNS 로그인 버튼 리스트 */}
                  <LoginGoogleButton></LoginGoogleButton>
                  <LoginNaverButton></LoginNaverButton>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </Container>
  );
}
