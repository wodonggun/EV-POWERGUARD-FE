import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Station, Charger } from '../pages/station';
import { Review } from '../pages/review';
import { DriverLog } from '../pages/driverlog';
import Home from '../pages/account/home';
import SignIn from '../pages/account/signIn';

function Content() {
  return (
    <div className="App">
      <Routes>
        <Route exact={true} path="/" element={<SignIn />}></Route>
        <Route path="/station" element={<Station />}></Route>
        <Route path="/charger/:stationId" element={<Charger />}></Route>
        <Route path="/review" element={<Review />}></Route>
        <Route path="/driverlog" element={<DriverLog />}></Route>
      </Routes>
    </div>
  );
}
export default Content;
