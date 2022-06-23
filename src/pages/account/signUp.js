import { React, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import { useStoreAuth } from '../../stores';
import api from '../../api';
import { useNavigate } from 'react-router-dom';

const passwordMaxValue = 20; //비밀번호 최대값
const passwordMinValue = 5; //비밀번호 최소값

const theme = createTheme();
export default function SignUp() {
  const navigate = useNavigate();

  const { userId, userProfileImg, userToken, userMemberShip } = useStoreAuth(
    (state) => state
  );

  //뿌릴데이터State
  const [inputs, setInputs] = useState({
    id: '',
    password: '',
    email: '',
    name: '',
    phoneNumber: '',
    memberType: '',

    carNumber: '',
    carName: '',
    chargerType: '',
    batteryCapacity: '',
  });
  const {
    id,
    password,
    email,
    name,
    phoneNumber,
    memberType,
    carNumber,
    carName,
    chargerType,
    batteryCapacity,
  } = inputs;

  const onChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    console.log('gd');
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });

    setUser();
  };

  const setUser = async (e) => {
    e.preventDefault();
    const data = {
      id: id,
      password: password,
      email: email,
      name: name,
      phoneNumber: phoneNumber,
      memberType: memberType,
      carInfo: {
        carNumber: carNumber,
        carName: carName,
        chargerType: chargerType,
        batteryCapacity: batteryCapacity,
      },
    };

    //Header ID정보 체크
    if (userId === null || userId.length === 0) {
      alert('로그인을 먼저 진행해주세요.');
    }
    if (password === null || password.length > passwordMaxValue) {
      alert('비밀번호가 너무 길다. 최대 :' + passwordMaxValue);
      return;
    }
    if (password === null || password.length < passwordMinValue) {
      alert('비밀번호가 너무 짧다. 최소 :' + passwordMinValue);
      return;
    }
    const res = await api.post('http://localhost:8080/api/users', data);

    //CREATE 성공은 201
    if (res.status === 200 || res.status === 201) {
      alert('회원가입 성공');
      navigate('/signIn');
      console.log(res.data);
    } else {
      alert('회원가입 실패');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="id"
                  required
                  fullWidth
                  id="id"
                  label="id"
                  onChange={onChange}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="password"
                  type="password"
                  label="password"
                  name="password"
                  onChange={onChange}
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="name"
                  label="name"
                  type="name"
                  id="name"
                  autoComplete="Name"
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="phoneNumber"
                  label="phoneNumber"
                  type="phoneNumber"
                  id="phoneNumber"
                  autoComplete="new-Phonenumber"
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    가입자 정보
                  </FormLabel>
                  <RadioGroup
                    id="memberType"
                    name="memberType"
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    onChange={onChange}
                  >
                    <FormControlLabel
                      value="CUSTOMER"
                      control={<Radio />}
                      label="CUSTOMER"
                    />
                    <FormControlLabel
                      value="MANAGER"
                      control={<Radio />}
                      label="MANAGER"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              {/* ======= 차량 정보 ========= */}
              <Grid item xs={12} sm={6}>
                <TextField
                  name="carNumber"
                  required
                  fullWidth
                  id="carNumber"
                  label="차량번호"
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="carName"
                  label="차량이름"
                  name="carName"
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="chargerType"
                  label="chargerType"
                  name="chargerType"
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="batteryCapacity"
                  label="batteryCapacity"
                  name="batteryCapacity"
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="회원가입 마케팅정보 동의."
                />
              </Grid>
            </Grid>
            <Button
              onClick={setUser}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signIn" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
