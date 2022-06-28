import React, { Component, useEffect } from 'react';
import { useStore } from 'zustand';
import { useStoreAuth } from '../../../stores';
import { Link, useNavigate } from 'react-router-dom';
import LoggedIn from '../components/LoggedIn';
function LoginNaver() {
  const store = useStoreAuth();
  const navigate = useNavigate();
  // Naver sdk import
  const naverScript = document.createElement('script');
  naverScript.src =
    'https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2-nopolyfill.js';
  naverScript.type = 'text/javascript';
  document.head.appendChild(naverScript);

  // Naver sdk 스크립트 로드 완료시
  naverScript.onload = () => {
    const naverLogin = new window.naver.LoginWithNaverId({
      clientId: 'Bmd7liz8fL4CGRV4QcXo',
      callbackUrl: 'https://ev.hrd-edu.cloudzcp.com',
      //callbackUrl: 'http://localhost:3000',
      callbackHandle: false,
      isPopup: false, // 로그인 팝업여부
      loginButton: {
        color: 'green', // 색상(white, green)
        type: 3, // 버튼타입(1,2,3)
        height: 41, // 배너 및 버튼 높이
      },
    });

    naverLogin.init();
    naverLogin.logout(); // 네이버 로그인이 계속 유지되는 경우가 있다. 초기화시 로그아웃
    naverLogin.getLoginStatus((status) => {
      if (status) {
        const { id, email, profile_image, birthday, name, mobile } =
          naverLogin.user;
        const { accessToken, expires, ttl } = naverLogin.accessToken;
        console.log(
          'Naver 로그인 성공 : ',
          id,
          email,
          profile_image,
          name,
          birthday
        );

        // 필수 제공 동의 조건
        if (email === undefined) {
          alert('이메일은 필수 동의 입니다. 정보제공을 동의해주세요.');
          naverLogin.reprompt();
          return;
        }

        let loginValue = {
          id: email,
          id_number: id,
          login_type: 'NAVER',
          profileImg: profile_image,
          email: email,
          access_token: accessToken,
          member_type: 'CUSTOMER',
          id_token: '',
        };
        LoggedIn(loginValue);
        navigate('/station');
        store.setUserProfile(email, profile_image, '');
      } else {
        console.log('Naver 비 로그인 상태');
      }
    });
  };

  useEffect(() => {
    // component 가 랜더링 될 때 실행되는 함수
  }, []);
  return <div id="naverIdLogin"></div>;
}
export default LoginNaver;
