import * as React from 'react';
import { Container } from '@mui/material';
import LoginGoogleButton from '../account/Oauth2/loginGoogle';

function SignInSide() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };
}
function Home() {
  return (
    <>
      <Container>
        <div>
          <br />
          <br />
          <br /> [ 메인 화면 임시 테스트 ]
        </div>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/signIn">로그인화면</a>
          </li>
          <li>
            <a href="/signUp">회원가입</a>
          </li>
        </ul>
      </Container>
    </>
  );
}

export default Home;
