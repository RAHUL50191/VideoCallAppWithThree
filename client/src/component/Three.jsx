
import React, { useEffect, useState } from 'react'
import { Canvas} from '@react-three/fiber'
import { Avatar } from './model/Avatar'
import { OrbitControls,ScrollControls,Scroll, Environment ,Sky} from '@react-three/drei'
import {Interface} from './interface/Interface';
import Exp from './experience/Exp';
 


export default function Three(){
const [windowHeight, setWindowHeight] = useState(window.innerHeight);
 
useEffect(() => {
  const handleResize = () => {
    setWindowHeight(window.innerHeight);
  };

  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []); 
 
    return(
  <Canvas style={{width:"100%" ,height: windowHeight }}  shadows camera={{position:[0,1,5],fov:30}}>
    <ambientLight intensity={1}  />
    <color attach={"background"} args={["#fffff8"]}></color>
     <Sky sunPosition={[2,.5,0]}/>
      <></>
    <ScrollControls pages={4} damping={.1}>
      <Exp/>
      <Scroll html>
        <Interface/>
      </Scroll>
    </ScrollControls>  
  </Canvas>
)
} 
