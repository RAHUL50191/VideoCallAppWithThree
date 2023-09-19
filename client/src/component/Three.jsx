import * as THREE from 'three'
import React, { useEffect, useState } from 'react'
import { Canvas} from '@react-three/fiber'
import { Avatar } from './model/Avatar'
import { OrbitControls,ScrollControls,Scroll, Environment ,Sky} from '@react-three/drei'
import {Interface} from './interface/Interface';
import Exp from './experience/Exp';
import ScrollManager from './experience/ScrollManager';
 


export default function Three(){
const [windowHeight, setWindowHeight] = useState(window.innerHeight);
const [section,setSection]=useState(0);
 
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
  <Canvas style={{width:"100%" ,height: windowHeight }}  shadows camera={{position:[0,.5,5],fov:30,}}>
    <ambientLight intensity={1}  />
    <color attach={"background"} args={["#fffff8"]}></color>
     <Sky sunPosition={[2,.5,0]}/>
     <ScrollManager section={section} onSectionChange={setSection} />
    <ScrollControls pages={4} damping={.1}>
      <Exp/>
      <Scroll html>
        <Interface/>
      </Scroll>
    </ScrollControls>  
  </Canvas>
)
} 
