import React, { useEffect, useState } from 'react';
import Header from './Header.jsx';
import Main from './Main.jsx';
import Footer from './Footer.jsx';
import PopupWithImage from './PopupWithImage.jsx';
import api from '../utils/Api.js';


function App() {
  
  return (
    <>
    <Header></Header> 
    <Main></Main>
    <Footer></Footer>
    </>
  
  );
}

export default App;
