import React, { useState, useEffect } from "react";
import {axiosWithAuth} from '../utils/axiosWithAuth.js'

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  
  // fetch your colors data from the server when the component mounts
  useEffect(()=>{
    axiosWithAuth()
      .get('/api/colors')
      .then(res => {
        console.log(res)
        // set that data to the colorList state property
        setColorList(res.data)
      })
  },[])


  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
