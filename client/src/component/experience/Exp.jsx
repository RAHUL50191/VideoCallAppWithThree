import React from 'react'
import * as THREE from 'three'
import { Avatar } from '../model/Avatar'
import { DoubleSide,TextureLoader } from 'three'
 import { useLoader } from '@react-three/fiber';
export default function Exp() {
    const texturePeace = useLoader(TextureLoader, './texture/peaceBackground.jpg');
    const textureCloud = useLoader(TextureLoader, './texture/cloud.jpg');
    const textureCloud1 = useLoader(TextureLoader, './texture/cloud1.jpg');
  return (
    <>
        <Avatar/>
        <mesh scale={new THREE.Vector3(15,5,5)} rotateX={-Math.PI/2}  position={[0,1.75,-2.5]}>
            <planeGeometry />
            <meshStandardMaterial />
            <meshBasicMaterial color={'#E5D4ED'} map={textureCloud} side={DoubleSide}  />
        </mesh> 
        <mesh scale={new THREE.Vector3(5,15,5)} rotation ={[Math.PI/2,0,Math.PI/2]} position={[0,-.75,0]}>
            <planeGeometry args={[1,1,1]} />
            <meshStandardMaterial  color={'#E5D4ED'} side={DoubleSide}/>
        </mesh> 
        {/*
          <mesh scale={new THREE.Vector3(.5,.5,.5)}  position={[0,-0.5,-.45]}>
            <boxGeometry args={[1,1,1]} />
            <meshStandardMaterial color={"#a2a1ae"}   side={DoubleSide}/>
          </mesh> 
        */}
    </>
  )
}
