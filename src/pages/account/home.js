import * as React from 'react';
import { Container } from '@mui/material';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <Container>
        <div>
          <br />
          <br />
          <br />[ 메인 화면 임시 테스트 ]
        </div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/signIn">로그인화면</Link>
          </li>
          <li>
            <Link to="/signUp">회원가입</Link>
          </li>
          <li>
            <Link to="/signEdit">회원수정</Link>
          </li>
          <li>
            <Link to="/loginSuccess">로그인 성공</Link>
          </li>
        </ul>
      </Container>
    </>
  );
}

export default Home;
