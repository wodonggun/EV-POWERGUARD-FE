function LogOut() {
  //로그아웃 조건 확인

  //로그아웃 처리
  let sessionStorage = window.sessionStorage;
  sessionStorage.clear();

  //로그아웃 후처리
  sessionStorage.setItem('userId', 'GUEST');
  sessionStorage.setItem('userProfileImg', '/static/images/avatar/2.jpg');

  return <></>;
}

export default LogOut;
