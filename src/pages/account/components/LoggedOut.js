function LoggedOut() {
  //로그아웃 조건 확인

  //로그아웃 처리
  let sessionStorage = window.sessionStorage;
  sessionStorage.clear();

  //로그아웃 후처리
  sessionStorage.setItem('id', 'GUEST');
  sessionStorage.setItem('profile_image', '/static/images/avatar/2.jpg');

  return <></>;
}

export default LoggedOut;
