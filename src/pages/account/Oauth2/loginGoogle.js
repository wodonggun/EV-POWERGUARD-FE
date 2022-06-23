import GoogleLogin from 'react-google-login';
import { useStore } from 'zustand';
import { useStoreAuth } from '../../../stores';
import LoggedIn from '../components/LoggedIn';

const clientId =
  '235080019852-bi0219rldfmnd5tt5pblfvmkpsjdf9tk.apps.googleusercontent.com';

function Login({ onGoogleLogin }) {
  const store = useStoreAuth();
  let sessionStorage = window.sessionStorage;
  const onSuccess = async (res) => {
    console.log('구글 로그인 성공', res.getBasicProfile());
    console.log('구글 로그인 성공', res);
    debugger;

    var profile = res.getBasicProfile();

    //미구현
    //구글로그인 성공 -> db조회 -> 회원가입 or 기존회원이면 MemberType 넘겨줘야함.
    let loginValue = {
      id: profile.getEmail(),
      id_number: profile.getId(),
      profileImg: profile.getImageUrl(),
      email: profile.getEmail(),
      access_token: res.accessToken,
      id_token: res.tokenId,
    };
    LoggedIn(loginValue);
  };

  const onFailure = (res) => {
    console.log('실패 : ' + res);
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        ButtonText="Login"
        responseType={'id_token'}
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        inSignedIn={true}
        clientSecret={'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'}
      />
    </div>
  );
}

export default Login;
