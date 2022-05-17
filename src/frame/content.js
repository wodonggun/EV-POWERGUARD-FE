import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Review } from '../pages/review';
import Home from '../pages/account/home';
import SignIn from '../pages/account/signIn';
import SignUp from '../pages/account/signUp';

function Content() {
  return (
    <div className="App">
      <Routes>
        <Route exact={true} path="/" element={<Home />}></Route>
        <Route path="/review" element={<Review />}></Route>
        <Route path="/signIn" element={<SignIn />}></Route>
        <Route path="/signUp" element={<SignUp />}></Route>
      </Routes>
    </div>
  );
}
export default Content;
