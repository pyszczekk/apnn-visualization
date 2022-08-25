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

export default class NetworkAnimation extends React.Component{
  constructor(...props){
      super(...props);
      
  }
  

getColors = () =>{
  const colors = [this.props.neuronColor==null?"#FFB60A":this.props.neuronColor, this.props.synapsisColor==null?"#012C56":this.props.synapsisColor, this.props.impulseColor==null?"#FF331F":this.props.impulseColor, this.props.refractionColor==null?"#1798DE":this.props.refractionColor, this.props.relaxingColor==null?"#59FFA0":this.props.relaxingColor];
  return colors;
}
getDefaultView=()=>{
  
     return( 
      <Canvas gl={{ antialias: true, toneMapping: THREE.NoToneMapping }}
      linear style ={{height:600, width:800, background: this.props.bgColor==null?"#000E17":this.props.bgColor, float:"left", transition: "all .3s ease"}} 
      orthographic camera={{ position: [0, 0, 500] }}>
 <ambientLight intensity={0.4} />
 <directionalLight position={[500, 500, -500]} castShadow intensity={0.5} shadow-camera-far={50} />
 <directionalLight position={[-500, -500,-500]} castShadow intensity={0.5} shadow-camera-far={10} />
 <directionalLight position={[0, 0, 500]} castShadow intensity={1} shadow-camera-far={100} />

  {/**
   * camera controllers do wylaczenia jak juz bedzie wszystko zautomatyzowane
   * 
   */}
   {/* <OrbitControls /> */}
   {/* <primitive object={new THREE.AxesHelper(1000)} />
    */}
   {/* <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
   <pointLight position={[-10, -10, -10]} />*/}
   
   {/* <Box onHover={onHover} position={[0, 0, 300]} />
    */}
   {/*<Sphere onHover={onHover} position={[10, 0, 0]} />
    */}
{/* {getNeuron()}  */}
 
 </Canvas>
     )
  }

  generateVisualization=()=>{
      return( 
        <Canvas gl={{ antialias: true, toneMapping: THREE.NoToneMapping }}
        linear style ={{height:600, width:800, background: this.props.bgColor==null?"#000E17":this.props.bgColor, float:"left", transition: "all .3s ease"}} 
        orthographic camera={{ position: [0, 0, 500] }}>
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
{/* {getNeuron()}  */}
   

    <Synapsis bgColor={this.props.bgColor==null?"#000E17":this.props.bgColor} changeInfo={this.props.changeInfo} start={[-100, -100, 100]} end={[0, 100, 0]} colors={this.getColors()}  />
    <Synapsis bgColor={this.props.bgColor==null?"#000E17":this.props.bgColor}  changeInfo={this.props.changeInfo} start={[-100, -100, 100]} end={[50, 50, 0]} colors={this.getColors()}  />
    <Synapsis bgColor={this.props.bgColor==null?"#000E17":this.props.bgColor} changeInfo={this.props.changeInfo} start={[50, 100, -10]} end={[100, -100, 0]} colors={this.getColors()} />
    <Synapsis bgColor={this.props.bgColor==null?"#000E17":this.props.bgColor} changeInfo={this.props.changeInfo} start={[100, 0, 0]} end={[-100, 0, 0]} colors={this.getColors()} />

   </Canvas>
      )
   }
  
  render(){
      let showVisualization = this.props.training;
      return (
          <div>
          {showVisualization ? this.generateVisualization() : this.getDefaultView() }
      </div>
      )
  }
}