import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Station } from '../pages/station';

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
