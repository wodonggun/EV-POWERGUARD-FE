import { GoogleLogout } from 'react-google-login';

const clientId =
  '235080019852-bi0219rldfmnd5tt5pblfvmkpsjdf9tk.apps.googleusercontent.com';

function Logout() {
  const onSuccess = (res) => {
    console.log('로그아웃 성공');
  };

  return (
    <div id="signOutButton">
      <GoogleLogout
        clientId={clientId}
        ButtonText={'Logout'}
        onLogoutSuccess={onSuccess}
      />
    </div>
  );
}

export default Logout;
