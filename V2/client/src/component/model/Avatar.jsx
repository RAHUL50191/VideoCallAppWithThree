/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.4 ./client/public/model/avatar.glb
*/
import React, { useRef, useEffect } from 'react';
import {useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations, useFBX } from '@react-three/drei';
import { useControls } from 'leva';
import * as THREE from 'three';

export function Avatar(props) {
  const Avatar = useRef();
  
  const { animationsOptions, headfollow, cursorfollow } = useControls({
    animationsOptions: { value: 'Idle', options: ["Idle","Explaning","Falling","Handexplain",'Noding','Hello',"Hellositing","Sitting","SittingMotion","Talking","Talkinglefthandup","TalkingRed","Toyou",'Typing',"Walking","Waving" ] },
    cursorfollow: false,
    headfollow: false,
  });
  //load model
  const { nodes, materials } = useGLTF('assets/model/avatar.glb');
  //load animations
  const { animations: idle } = useFBX('assets/animation/Idle.fbx');
  const { animations: explaning } = useFBX('assets/animation/Explaining.fbx');
  const { animations: falling } = useFBX('assets/animation/Falling.fbx');
  const { animations: handexplain } = useFBX('assets/animation/Handexplain.fbx');
  const { animations: noding } = useFBX('assets/animation/HeadNodYes.fbx');
  const { animations: hello } = useFBX('assets/animation/Hello.fbx');
  const { animations: hellositting } = useFBX('assets/animation/Hellositing.fbx');
  const { animations: sitting } = useFBX('assets/animation/Sitting.fbx'); 
  const { animations: sittingMotion } = useFBX('assets/animation/SittingMotion.fbx');  
  const { animations: talking } = useFBX('assets/animation/Talking.fbx'); 
  const { animations: talkinglefthandup } = useFBX('assets/animation/Talkinglefthandup.fbx');
  const { animations: talkingred } = useFBX('assets/animation/TalkingRed.fbx');
  const { animations: toyou} = useFBX('assets/animation/Toyou.fbx');
  const { animations: typing } = useFBX('assets/animation/Typing.fbx');
  const { animations: walking } = useFBX('assets/animation/Walking.fbx');
  const { animations: waving } = useFBX('assets/animation/Waving.fbx');
  //name animation
  idle[0].name="Idle"
  explaning[0].name = "Explaning"
  falling[0].name = "Falling"
  handexplain[0].name="Handexplain";
  noding[0].name = 'Noding';
  hello[0].name = 'Hello';
  hellositting[0].name="Hellositing";
  sitting[0].name="Sitting";
  sittingMotion[0].name="SittingMotion"
  talking[0].name="Talking";
  talkinglefthandup[0].name="Talkinglefthandup"
  talkingred[0].name="TalkingRed";
  toyou[0].name="Toyou"
  typing[0].name = 'Typing';
  walking[0].name="Walking";
  waving[0].name="Waving"
  
  //set action to model
  const { actions } = useAnimations([ 
    idle[0],
    explaning[0] ,
    falling[0] ,
    handexplain[0] ,
    noding[0] ,
    hello[0] ,
    hellositting[0] ,
    sitting[0] ,
    sittingMotion[0] ,
    talking[0] ,
    talkinglefthandup[0] ,
    talkingred[0] ,
    toyou[0] ,
    typing[0] ,
    walking[0] ,
    waving[0] ], Avatar);

  useFrame((state) => {
    if (cursorfollow)
      Avatar.current.getObjectByName('Head').lookAt(new THREE.Vector3(state.mouse.x, state.mouse.y, 1));
    if (headfollow)
      Avatar.current.getObjectByName('Head').lookAt(state.camera.position);
  });


  useEffect(() => {
    actions[animationsOptions].reset().play();
    return () => {
      actions[animationsOptions].reset().stop();
    };
  }, [animationsOptions,actions]);


  return (
 <group  {...props} ref={Avatar} dispose={null} position-y={-.75}>
    <group rotation={[-Math.PI/2,0,0]}>
      <primitive object={nodes.Hips} />
      <skinnedMesh geometry={nodes.Wolf3D_Body.geometry} material={materials.Wolf3D_Body} skeleton={nodes.Wolf3D_Body.skeleton} />
      <skinnedMesh geometry={nodes.Wolf3D_Outfit_Bottom.geometry} material={materials.Wolf3D_Outfit_Bottom} skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton} />
      <skinnedMesh geometry={nodes.Wolf3D_Outfit_Footwear.geometry} material={materials.Wolf3D_Outfit_Footwear} skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton} />
      <skinnedMesh geometry={nodes.Wolf3D_Outfit_Top.geometry} material={materials.Wolf3D_Outfit_Top} skeleton={nodes.Wolf3D_Outfit_Top.skeleton} />
      <skinnedMesh geometry={nodes.Wolf3D_Hair.geometry} material={materials.Wolf3D_Hair} skeleton={nodes.Wolf3D_Hair.skeleton} />
      <skinnedMesh geometry={nodes.Wolf3D_Glasses.geometry} material={materials.Wolf3D_Glasses} skeleton={nodes.Wolf3D_Glasses.skeleton} />
      <skinnedMesh name="EyeLeft" geometry={nodes.EyeLeft.geometry} material={materials.Wolf3D_Eye} skeleton={nodes.EyeLeft.skeleton} morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary} morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences} />
      <skinnedMesh name="EyeRight" geometry={nodes.EyeRight.geometry} material={materials.Wolf3D_Eye} skeleton={nodes.EyeRight.skeleton} morphTargetDictionary={nodes.EyeRight.morphTargetDictionary} morphTargetInfluences={nodes.EyeRight.morphTargetInfluences} />
      <skinnedMesh name="Wolf3D_Head" geometry={nodes.Wolf3D_Head.geometry} material={materials.Wolf3D_Skin} skeleton={nodes.Wolf3D_Head.skeleton} morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences} />
      <skinnedMesh name="Wolf3D_Teeth" geometry={nodes.Wolf3D_Teeth.geometry} material={materials.Wolf3D_Teeth} skeleton={nodes.Wolf3D_Teeth.skeleton} morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences} />
    </group>
    {animationsOptions==="Sitting"?
    <mesh scale={new THREE.Vector3(.5,.5,.5)}  position={[0,-0.5,-.45]}>
            <boxGeometry args={[1,1,1]} />
            <meshStandardMaterial color={"#a2a1ae"}   side={THREE.DoubleSide}/>
        </mesh>:<></> }
    </group>
  )
}

useGLTF.preload('model/avatar.glb')
