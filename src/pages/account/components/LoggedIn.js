function LoggedIn(props) {
  /* 예시 데이터props
  let loginValue = {
    id: res.data.email,
    id_number: '',
    profileImg: '',
    email: res.data.email,
    access_token: '',
    id_token: '',
    member_type: '',
  };
  */

  //로그인 조건

  //로그인 전처리
  let sessionStorage = window.sessionStorage;
  sessionStorage.clear();

  let userInfo = props;

  //로그인 후처리
  sessionStorage.setItem('id', userInfo.id);
  debugger;
  if (userInfo.profileImg === null || userInfo.profileImg === '') {
    sessionStorage.setItem('profile_image', '/static/images/avatar/2.jpg');
  } else {
    sessionStorage.setItem('profile_image', userInfo.profileImg);
  }
  console.log(userInfo.member_type);
  if (userInfo.member_type === null || userInfo.member_type === '') {
    sessionStorage.setItem('member_type', 'CUSTOMER');
  } else {
    sessionStorage.setItem('member_type', userInfo.member_type);
  }

  return <></>;
}

export default LoggedIn;
