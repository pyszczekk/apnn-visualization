import React, {useEffect} from 'react'
import { useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { EffectComposer, Outline, SelectiveBloom } from '@react-three/postprocessing'
import Neuron from './components/Neuron';
import Synapsis from './components/Synapsis';
import InformationPanel from './components/InformationPanel';
import ControlPanel from './components/ControlPanel';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from "three";
import styles from './styles.module.css';


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


export const VisualizationApp = ({ connectionAddress, bgColor, neuronColor, synapsisColor, impulseColor }) => {
  const [hovered, onHover] = useState(null)
  const [darkMode, setDarkMode] = React.useState(true);
  const selected = hovered ? [hovered] : undefined
  const cRef = React.useRef();
  const colors = [neuronColor==null?"#A24101":neuronColor, synapsisColor==null?"#012C56":synapsisColor, impulseColor==null?"#339BDD":impulseColor];
  const connAddress = connectionAddress==null?"localhost:8080":connectionAddress;
  return (
    <div className={darkMode? styles.dark : styles.light}>
      <ControlPanel toggleDark={() => {
              setDarkMode(!darkMode);
            console.log(darkMode)}
              } />
    <Canvas style ={{height:600, width:800, background: bgColor==null?"#000E17":bgColor, float:"left"}} orthographic camera={{ position: [0, 0, 500] }}>
    <ambientLight intensity={0.4} />
    <directionalLight position={[500, 500, -500]} castShadow intensity={0.5} shadow-camera-far={50} />
    <directionalLight position={[-500, -500,-500]} castShadow intensity={0.5} shadow-camera-far={10} />
    <directionalLight position={[0, 0, 500]} castShadow intensity={1} shadow-camera-far={100} />
  
     {/**
      * camera controllers do wylaczenia jak juz bedzie wszystko zautomatyzowane
      * 
      */}
      <CameraController />
      {/* <primitive object={new THREE.AxesHelper(100)} />
       */}
      {/* <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />*/}
      
      {/* <Box onHover={onHover} position={[0, 0, 300]} />
       */}
      {/*<Sphere onHover={onHover} position={[10, 0, 0]} />
       */}

      <Neuron onHover={onHover} position={[0,0,0]} charging={0.01} chargingRef={cRef} colors={colors}/>
     

     <Synapsis start={[-100, -100, 100]} end={[0, 100, 0]} colors={colors} onHover={onHover} />
     <Synapsis start={[50, 100, -10]} end={[100, -100, 0]} colors={colors} onHover={onHover}/>
     <Synapsis start={[100, 0, 0]} end={[-100, 0, 0]} colors={colors} onHover={onHover}/>
     {/* <Synapsis end={[100, 0, 0]} start={[-100, 0, 0]} /> */}
      {/* <Box onHover={onHover} position={[1, 0, 0]} /> */}
      <EffectComposer multisampling={8} autoClear={false}>
        <Outline blur selection={selected} visibleEdgeColor="#FFF" edgeStrength={100} width={10} />
        {/* <SelectiveBloom selection={selected} luminanceThreshold={0} luminanceSmoothing={0} /> */}
      </EffectComposer>
    </Canvas>
    <InformationPanel/>
    </div>
  )
}
