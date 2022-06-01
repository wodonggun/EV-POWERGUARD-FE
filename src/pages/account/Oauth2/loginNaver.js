import React, { Component } from 'react';
import { useStore } from 'zustand';
import { useStoreAuth } from '../../../stores';
import { Link } from 'react-router-dom';

function LoginNaver() {
  const store = useStoreAuth();

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
      callbackUrl: 'http://localhost:3000/signIn',
      callbackHandle: true,
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
        //console.log('Naver 로그인 상태', naverLogin.user);
        const { id, email, profile_image, birthday, name } = naverLogin.user;
        console.log(
          'Naver 로그인 성공 : ',
          id,
          email,
          profile_image,
          name,
          birthday
        );

        store.setUserProfile(email, profile_image, '');

        // 필수 제공 동의 조건
        if (email === undefined) {
          alert('이메일은 필수 동의 입니다. 정보제공을 동의해주세요.');
          naverLogin.reprompt();
          return;
        }
        <Link to="loginSuccess"></Link>;
      } else {
        console.log('Naver 비 로그인 상태');
      }
    });
  };

  return <div id="naverIdLogin"></div>;
}
export default LoginNaver;
