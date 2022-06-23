import { useNavigate } from 'react-router-dom';
import { useStoreAuth } from '../../../stores';

function LoggedIn(props) {
  //const navigate = useNavigate();
  // const store = useStoreAuth();
  /* 예시 데이터props
  let loginValue = {
    id: res.data.email,
    id_number: '',
    profile_image: '',
    email: res.data.email,
    access_token: '',
    id_token: '',
    member_type: '',
    login_type: '',
  };
  */

  //로그인 조건

  //로그인 전처리
  let sessionStorage = window.sessionStorage;
  sessionStorage.clear();

  let userInfo = props;

  //로그인 후처리
  sessionStorage.setItem('id', userInfo.id);

  if (userInfo.profileImg === null || userInfo.profileImg === '') {
    sessionStorage.setItem('profile_image', '/static/images/avatar/2.jpg');
  } else {
    sessionStorage.setItem('profile_image', userInfo.profileImg);
  }

  if (userInfo.member_type === null || userInfo.member_type === '') {
    sessionStorage.setItem('member_type', 'CUSTOMER');
  } else {
    sessionStorage.setItem('member_type', userInfo.member_type);
  }

  // store.setUserProfile(userInfo.profileImg);
  // store.setUserId(userInfo.id);
  //로그인 이후 페이지 이동.
  // console.log('1234');
  // //navigate('/station');

  return <></>;
}

export default LoggedIn;
