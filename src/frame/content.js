import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Station, Charger } from '../pages/station';
import { Review } from '../pages/review';
import { DriverLog } from '../pages/driverlog';
import Home from '../pages/account/home';
import SignIn from '../pages/account/signIn';
import SignUp from '../pages/account/signUp';
import SignEdit from '../pages/account/signEdit';
import LoginSuccess from '../pages/account/loginSuccess';
import { Breakdown } from '../pages/breakdown';

function Content() {
  return (
    <div className="App">
      <Routes>
        <Route exact={true} path="/" element={<Home />}></Route>
        <Route path="/station" element={<Station />}></Route>
        <Route path="/charger/:stationId" element={<Charger />}></Route>
        <Route path="/review" element={<Review />}></Route>
        <Route path="/driverlog" element={<DriverLog />}></Route>
        <Route path="/signIn" element={<SignIn />}></Route>
        <Route path="/signUp" element={<SignUp />}></Route>
        <Route path="/signEdit" element={<SignEdit />}></Route>
        <Route path="/loginSuccess" element={<LoginSuccess />}></Route>
        <Route path="/breakdown" element={<Breakdown />}></Route>
      </Routes>
    </div>
  );
}
export default Content;
