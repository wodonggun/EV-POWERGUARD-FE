import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Review } from '../pages/review';
import { DriverLog } from '../pages/driverlog';
import Home from '../pages/account/home';
import SignIn from '../pages/account/signIn';
import SignUp from '../pages/account/signUp';
import LoginSuccess from '../pages/account/loginSuccess';

function Content() {
  return (
    <div className="App">
      <Routes>
        <Route exact={true} path="/" element={<Home />}></Route>
        <Route path="/review" element={<Review />}></Route>
        <Route path="/driverlog" element={<DriverLog />}></Route>
        <Route path="/signIn" element={<SignIn />}></Route>
        <Route path="/signUp" element={<SignUp />}></Route>
        <Route path="/loginSuccess" element={<LoginSuccess />}></Route>
      </Routes>
    </div>
  );
}
export default Content;
