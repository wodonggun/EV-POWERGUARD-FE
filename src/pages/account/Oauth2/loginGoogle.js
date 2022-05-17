import { GoogleLogin } from 'react-google-login';
const clientId =
  '235080019852-bi0219rldfmnd5tt5pblfvmkpsjdf9tk.apps.googleusercontent.com';

function Login() {
  const onSuccess = (res) => {
    console.log('성공');
    var profile = res.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  };

  const onFailure = (res) => {
    console.log('실패 : ' + res);
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        ButtonText="Login"
        //responseType={"id_token"}
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        inSignedIn={true}
      />
    </div>
  );
}

export default Login;
