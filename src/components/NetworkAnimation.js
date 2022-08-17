import React, {useEffect} from 'react'
import { useState } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import Neuron from './Neuron';
import Synapsis from './Synapsis';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from 'three'

const CameraController = () => {
  const { camera, gl } = useThree();
  useEffect(
    () => {
      const controls = new OrbitControls(camera, gl.domElement);

      controls.minDistance = 3;
      controls.maxDistance = 20;
      return () => {
        controls.dispose();
      };
    },
    [camera, gl]
  );
  return null;
}

function NetworkAnimation({ changeInfo,connectionAddress, bgColor, neuronColor, synapsisColor, impulseColor,relaxationColor,  ...props}){
        const [hovered, onHover] = useState(null)
        
         const cRef = React.useRef();
         const colors = [neuronColor==null?"#FFB60A":neuronColor, synapsisColor==null?"#012C56":synapsisColor, impulseColor==null?"#FF331F":impulseColor, relaxationColor==null?"#1798DE":relaxationColor];
        const [charging, setCharging] = React.useState(1.0);
        const [diff, setDiff] = React.useState(-0.01);
        const getNeuron = ()=>{
            setTimeout(()=>{
            var ch = charging;
            // var diff =-0.01;
            if(ch<=0){
              setDiff(0.01);
            }
            if(ch>=1){
              setDiff(-0.01);
            }
            setCharging(ch+diff);
            })
            return  <Neuron changeInfo={changeInfo} position={[0,0,0]} charging={charging} chargingRef={cRef} colors={colors}/>
           
          }
        

 
        return (
         <Canvas gl={{ antialias: true, toneMapping: THREE.NoToneMapping }}
         linear style ={{height:600, width:800, background: bgColor==null?"#000E17":bgColor, float:"left"}} orthographic camera={{ position: [0, 0, 500] }}>
    <ambientLight intensity={0.4} />
    <directionalLight position={[500, 500, -500]} castShadow intensity={0.5} shadow-camera-far={50} />
    <directionalLight position={[-500, -500,-500]} castShadow intensity={0.5} shadow-camera-far={10} />
    <directionalLight position={[0, 0, 500]} castShadow intensity={1} shadow-camera-far={100} />
  
     {/**
      * camera controllers do wylaczenia jak juz bedzie wszystko zautomatyzowane
      * 
      */}
      <CameraController />
      {/* <primitive object={new THREE.AxesHelper(1000)} />
       */}
      {/* <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />*/}
      
      {/* <Box onHover={onHover} position={[0, 0, 300]} />
       */}
      {/*<Sphere onHover={onHover} position={[10, 0, 0]} />
       */}
{getNeuron()}
     

     <Synapsis changeInfo={changeInfo} start={[-100, -100, 100]} end={[0, 100, 0]} colors={colors} onHover={onHover} />
     <Synapsis changeInfo={changeInfo} start={[-100, -100, 100]} end={[50, 50, 0]} colors={colors} onHover={onHover} />
     <Synapsis changeInfo={changeInfo} start={[50, 100, -10]} end={[100, -100, 0]} colors={colors} onHover={onHover}/>
     <Synapsis changeInfo={changeInfo} start={[100, 0, 0]} end={[-100, 0, 0]} colors={colors} onHover={onHover}/>
 
    </Canvas>
        )
}
export default React.memo(NetworkAnimation);