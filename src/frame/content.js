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
        <Route path="/station" element={<Station />}></Route>
      </Routes>
    </div>
  );
}
export default Content;
