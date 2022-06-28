import { React, useCallback, useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useStoreAuth } from '../../stores';

import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import api from '../../api';
import { useNavigate, Navigate } from 'react-router-dom';

const theme = createTheme();
const passwordMaxValue = 15; //비밀번호 최대값
const passwordMinValue = 5; //비밀번호 최소값

export default function SignEdit() {
  //인증정보Store
  const { userId, userProfileImg, userToken, userMemberShip } = useStoreAuth(
    (state) => state
  );

  const navigate = useNavigate();

  //뿌릴데이터State
  const [inputs, setInputs] = useState({
    id: '',
    password: '',
    email: '',
    name: '',
    phoneNumber: '',
    memberType: '',
    carInfo: {
      carNumber: '',
      carName: '',
      chargerType: '',
      batteryCapacity: '',
    },
  });
  const {
    id,
    password,
    email,
    name,
    phoneNumber,
    memberType,
    carInfo: { carNumber, carName, chargerType, batteryCapacity },
  } = inputs;

 
  const onChange = (e) => {
    if (e.target.name === 'carInfo') {
      if (e.target.id === 'carNumber')
        setInputs({
          ...inputs,
          ['carInfo']: {
            carNumber: e.target.value,
            carName: carName,
            chargerType: chargerType,
            batteryCapacity: batteryCapacity,
          },
        });
      if (e.target.id === 'carName')
        setInputs({
          ...inputs,
          ['carInfo']: {
            carNumber: carNumber,
            carName: e.target.value,
            chargerType: chargerType,
            batteryCapacity: batteryCapacity,
          },
        });
      if (e.target.id === 'chargerType') {
        setInputs({
          ...inputs,
          ['carInfo']: {
            carNumber: carNumber,
            carName: carName,
            chargerType: e.target.value,
            batteryCapacity: batteryCapacity,
          },
        });
      }
      if (e.target.id === 'batteryCapacity')
        setInputs({
          ...inputs,
          ['carInfo']: {
            carNumber: carNumber,
            carName: carName,
            chargerType: chargerType,
            batteryCapacity: e.target.value,
          },
        });
    } else
      setInputs({
        ...inputs,
        [e.target.name]: e.target.value,
      });
  };

  const getUser = async () => {
    
    //Header ID정보 체크
    if (userId === null || userId === 'GUEST' || userId.length === 0) {
      alert('로그인을 먼저 진행해주세요.');
      navigate('/signIn',{replace:true});
      return;
    }
    const res = await api.get('http://localhost:8080/api/users/' + userId);
    if (res.status === 200 || res.status === 302) {
      console.log(res.data);
      res.data.id = userId; //ID Header에서 가져와서 data에 Json형태로 강제로 넣어줌.
      console.log(res.data);
      setInputs(res.data);
    } else {
      alert(userId + '의 회원정보가 없습니다.');
    }
  };

  const setUser = async (e) => {
    e.preventDefault();
    const data = {
      id: id,
      password: password,
      name: name,
      phoneNumber: phoneNumber,
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

    const res = await api.patch(
      'http://localhost:8080/api/users/' + userId,
      data
    );

    if (res.status === 200 || res.status === 302) {
      alert('수정 성공');
      console.log(res.data);
    } else {
      alert('수정 실패');
    }
  };

  //회원 탈퇴
  const withdrawal = async (e) => {
    e.preventDefault();
    const data = {
      id: id,
      password: password,
      name: name,
      phoneNumber: phoneNumber,
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

    const res = await api.delete(
      'http://localhost:8080/api/users/' + userId,
      data
    );

    if (res.status === 200 || res.status === 204 || res.status === 302) {
      alert('탈퇴 성공');
      navigate('/signIn');
      console.log(res.data);
    } else {
      alert('탈퇴 실패');
    }
  };

  const signExit = (e) => {
    if (window.confirm('정말 삭제합니까?')) {
      withdrawal(e); //회원 삭제
      alert('삭제되었습니다.');
    } else {
      alert('취소합니다.');
    }
  };


  //일단 보류
  const handleSubmit = (event) => {
    event.preventDefault();

    //제약조건 확인
    const checkPassword = () => {
      if (password.length < 5) {
        alert('비밀번호가 짧습니다.');
        return;
      }
    };
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const hasError = (passwordEntered) =>
    password.length < passwordMinValue ? true : false;



  useEffect(() => {
    // component 가 랜더링 될 때 실행되는 함수
    getUser();
  }, []);

    
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
          <Avatar sx={{ m: 1, bgcolor: 'blue' }}>
            <AssignmentIndOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            회원 정보
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="id"
                  name="id"
                  variant="filled"
                  required
                  fullWidth
                  label="ID"
                  autoComplete="ID"
                  value={id}
                  onChange={onChange}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="password"
                  name="password"
                  type="password"
                  label="password(5글자 이상)"
                  required
                  fullWidth
                  variant="filled"
                  value={password}
                  onChange={onChange}
                  error={hasError('password')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="email"
                  id="email"
                  label="email"
                  type="email"
                  variant="filled"
                  value={email}
                  onChange={onChange}
                  autoComplete="email"
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
                  variant="filled"
                  value={name}
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
                  variant="filled"
                  value={phoneNumber}
                  onChange={onChange}
                  autoComplete="new-phoneNumber"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    가입자 정보
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={memberType}
                  >
                    <FormControlLabel
                      value="CUSTOMER"
                      control={<Radio />}
                      label="CUSTOMER"
                      disabled
                    />
                    <FormControlLabel
                      value="MANAGER"
                      control={<Radio />}
                      label="MANAGER"
                      disabled
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              {/* ======= 차량 정보 ========= */}
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="carNumber"
                  label="차량번호"
                  type="carNumber"
                  name="carInfo"
                  variant="filled"
                  value={carNumber}
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="carName"
                  label="차량이름"
                  name="carInfo"
                  variant="filled"
                  value={carName}
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="chargerType"
                  label="충전타입"
                  name="carInfo"
                  value={chargerType}
                  onChange={onChange}
                  variant="filled"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="batteryCapacity"
                  type="batteryCapacity"
                  label="총베터리"
                  name="carInfo"
                  value={batteryCapacity}
                  onChange={onChange}
                  variant="filled"
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
              수정
            </Button>
            <Button
              onClick={signExit}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              회원탈퇴
            </Button>
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
